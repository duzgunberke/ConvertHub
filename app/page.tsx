"use client"

import { useState, useCallback } from "react";
import { Search, Menu, Copy, Check, RotateCcw, Upload, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CategorySidebar } from "@/components/convert/category-sidebar";
import { ConverterCard } from "@/components/convert/converter-card";
import { categories, Category, Converter } from "@/models/converter";
import { useConverter } from "@/lib/api-client";
import { ConversionResponse } from "@/types/converter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedConverter, setSelectedConverter] = useState<Converter>(categories[0].converters[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [conversionResult, setConversionResult] = useState<ConversionResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const { convertWithId, loading, error } = useConverter();

  const filteredCategories = categories.map(category => ({
    ...category,
    converters: category.converters.filter(converter =>
      converter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      converter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      converter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.converters.length > 0);

  const handleConvert = useCallback(async () => {
    if (!inputValue.trim()) {
      toast.error("Please enter some input to convert");
      return;
    }
    
    try {
      const result = await convertWithId(selectedConverter.id, inputValue);
      
      if (result?.success && result.output !== undefined) {
        setOutputValue(result.output);
        setConversionResult(result);
        toast.success("Conversion completed successfully");
      } else {
        const errorMessage = result?.error || "Conversion failed";
        toast.error(errorMessage);
        setOutputValue("");
        setConversionResult(null);
      }
    } catch (err) {
      console.error('Conversion error:', err);
      toast.error("Failed to convert. Please try again.");
      setOutputValue("");
      setConversionResult(null);
    }
  }, [inputValue, selectedConverter.id, convertWithId]);

  const handleCopy = async () => {
    if (!outputValue) return;
    
    try {
      await navigator.clipboard.writeText(outputValue);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleClear = () => {
    setInputValue("");
    setOutputValue("");
    setConversionResult(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size must be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInputValue(result);
      toast.success(`File "${file.name}" loaded successfully`);
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
    };
    reader.readAsText(file);
  };

  const handleConverterSelect = (converter: Converter) => {
    setSelectedConverter(converter);
    // Clear outputs when switching converter
    setOutputValue("");
    setConversionResult(null);
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    if (category.converters.length > 0) {
      handleConverterSelect(category.converters[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex overflow-hidden">
      {/* Sidebar */}
      <CategorySidebar 
        categories={filteredCategories}
        selectedCategory={selectedCategory}
        selectedConverter={selectedConverter}
        isOpen={sidebarOpen}
        onCategorySelect={handleCategorySelect}
        onConverterSelect={handleConverterSelect}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card/60 backdrop-blur-xl border-b border-border/50 p-4 flex items-center gap-4 shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden h-9 w-9 p-0"
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search converters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 h-9"
            />
          </div>

          <div className="text-sm text-muted-foreground hidden md:flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {categories.reduce((total, cat) => total + cat.count, 0)} Tools
            </Badge>
            <span className="font-medium">{selectedConverter.name}</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Converter Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-gradient-primary">
                  {selectedConverter.name}
                </h1>
                {selectedConverter.featured && (
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {selectedConverter.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedConverter.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <Card className="p-4 border-destructive/50 bg-destructive/5">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Conversion Error</span>
                </div>
                <p className="text-sm mt-1">{error}</p>
              </Card>
            )}

            {/* Converter Interface */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input */}
              <Card className="p-6 space-y-4 glass shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Input</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClear}
                      className="h-8"
                      disabled={loading}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                    <label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="cursor-pointer h-8"
                        disabled={loading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".txt,.json,.csv,.xml,.yaml,.yml"
                        disabled={loading}
                      />
                    </label>
                  </div>
                </div>
                
                <Textarea
                  placeholder="Enter your input here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="min-h-[350px] bg-background/50 font-mono text-sm border-border/50 resize-none"
                  disabled={loading}
                />
                
                <Button
                  variant="default"
                  onClick={handleConvert}
                  disabled={!inputValue.trim() || loading}
                  className="w-full h-11 text-base font-medium"
                >
                  {loading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    "Convert"
                  )}
                </Button>
              </Card>

              {/* Output */}
              <Card className="p-6 space-y-4 glass shadow-card">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Output</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!outputValue || loading}
                    className="h-8"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                
                <Textarea
                  placeholder="Output will appear here..."
                  value={outputValue}
                  readOnly
                  className="min-h-[350px] bg-background/30 font-mono text-sm border-border/50 resize-none"
                />
                
                <div className="h-11 flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    {outputValue ? `${outputValue.length} characters` : "Ready to convert"}
                  </span>
                  {conversionResult?.metadata && (
                    <span className="text-xs">
                      Processed in {conversionResult.metadata.processingTime}ms
                    </span>
                  )}
                </div>
              </Card>
            </div>

            {/* Conversion Metadata */}
            {conversionResult?.metadata && (
              <Card className="p-4 glass">
                <h4 className="font-semibold mb-3">Conversion Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Input Length:</span>
                    <div className="font-mono">{conversionResult.metadata.inputLength} chars</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Output Length:</span>
                    <div className="font-mono">{conversionResult.metadata.outputLength} chars</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Processing Time:</span>
                    <div className="font-mono">{conversionResult.metadata.processingTime}ms</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Converter ID:</span>
                    <div className="font-mono text-xs">{conversionResult.metadata.converterId}</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Related Converters */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Related Converters</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedCategory.converters
                  .filter(c => c.id !== selectedConverter.id)
                  .slice(0, 3)
                  .map((converter) => (
                    <ConverterCard
                      key={converter.id}
                      converter={converter}
                      onClick={() => handleConverterSelect(converter)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};