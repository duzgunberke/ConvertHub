"use client"

import { useState, useCallback } from "react";
import { Search, Menu, Copy, Check, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CategorySidebar } from "@/components/convert/category-sidebar";
import { ConverterCard } from "@/components/convert/converter-card";
import { categories, Category, Converter } from "@/models/converter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedConverter, setSelectedConverter] = useState<Converter>(categories[0].converters[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredCategories = categories.map(category => ({
    ...category,
    converters: category.converters.filter(converter =>
      converter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      converter.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.converters.length > 0);

  const handleConvert = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    setIsConverting(true);
    try {
      // Simulate conversion delay for demo
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock conversion logic based on converter type
      let result = "";
      switch (selectedConverter.id) {
        case "base64-encode":
          result = btoa(inputValue);
          break;
        case "base64-decode":
          try {
            result = atob(inputValue);
          } catch {
            result = "Invalid Base64 input";
          }
          break;
        case "url-encode":
          result = encodeURIComponent(inputValue);
          break;
        case "url-decode":
          result = decodeURIComponent(inputValue);
          break;
        case "html-encode":
          result = inputValue
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;");
          break;
        case "json-format":
          try {
            result = JSON.stringify(JSON.parse(inputValue), null, 2);
          } catch {
            result = "Invalid JSON input";
          }
          break;
        case "hash-md5":
          // Mock MD5 for demo - in real app would use crypto library
          result = "5d41402abc4b2a76b9719d911017c592"; // Hello MD5
          break;
        default:
          result = `Converted: ${inputValue}`;
      }
      setOutputValue(result);
    } catch (error) {
      toast.error("Conversion failed");
    } finally {
      setIsConverting(false);
    }
  }, [inputValue, selectedConverter.id]);

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
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInputValue(result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex overflow-hidden">
      {/* Sidebar */}
      <CategorySidebar 
        categories={filteredCategories}
        selectedCategory={selectedCategory}
        selectedConverter={selectedConverter}
        isOpen={sidebarOpen}
        onCategorySelect={setSelectedCategory}
        onConverterSelect={setSelectedConverter}
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

          <div className="text-sm text-muted-foreground hidden md:block font-medium">
            {selectedConverter.name}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Converter Header */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gradient-primary">
                {selectedConverter.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {selectedConverter.description}
              </p>
            </div>

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
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                    <label>
                      <Button variant="outline" size="sm" className="cursor-pointer h-8">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept=".txt,.json,.csv,.xml"
                      />
                    </label>
                  </div>
                </div>
                <Textarea
                  placeholder="Enter your input here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="min-h-[350px] bg-background/50 font-mono text-sm border-border/50 resize-none"
                />
                <Button
                  variant="default"
                  onClick={handleConvert}
                  disabled={!inputValue.trim() || isConverting}
                  className="w-full h-11 text-base font-medium"
                >
                  {isConverting ? "Converting..." : "Convert"}
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
                    disabled={!outputValue}
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
                <div className="h-11 flex items-center justify-center text-sm text-muted-foreground">
                  {outputValue ? `${outputValue.length} characters` : "Ready to convert"}
                </div>
              </Card>
            </div>

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
                      onClick={() => setSelectedConverter(converter)}
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