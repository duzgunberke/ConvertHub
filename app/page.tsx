"use client"

import { useState, useCallback } from "react";
import { Search, Menu, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CategorySidebar } from "@/components/convert/category-sidebar";
import { ConverterCard } from "@/components/convert/converter-card";
import { DynamicConverterUI } from "@/components/convert/dynamic-converter";
import { categories, Category, Converter } from "@/models/converter";
import { useConverter } from "@/lib/api-client";
import { ConversionResponse, InputField } from "@/types/converter";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [selectedConverter, setSelectedConverter] = useState<Converter>(categories[0].converters[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [options, setOptions] = useState<Record<string, any>>({});
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

  const handleConvert = useCallback(async (input?: string, opts?: Record<string, any>) => {
    // For generators, input might be undefined
    if (selectedConverter.inputType !== 'generator' && (!input || !input.trim())) {
      toast.error("Please enter some input to convert");
      return;
    }
    
    try {
      const result = await convertWithId(selectedConverter.id, input || '', opts || options);
      
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
  }, [selectedConverter.id, selectedConverter.inputType, convertWithId, options]);

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
    setOptions({});
    setConversionResult(null);
  };

  const handleConverterSelect = (converter: Converter) => {
    setSelectedConverter(converter);
    // Clear outputs and options when switching converter
    setOutputValue("");
    setConversionResult(null);
    setInputValue("");
    setOptions({});
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    if (category.converters.length > 0) {
      handleConverterSelect(category.converters[0]);
    }
  };

  // Create a converter config object for the dynamic UI
  const converterConfig = {
    ...selectedConverter,
    inputType: selectedConverter.inputType || 'text',
    inputPlaceholder: getInputPlaceholder(selectedConverter),
    inputLabel: getInputLabel(selectedConverter),
    outputLabel: getOutputLabel(selectedConverter),
    outputType: getOutputType(selectedConverter),
    inputFields: getInputFields(selectedConverter),
    allowFileUpload: getAllowFileUpload(selectedConverter),
    maxFileSize: 10 * 1024 * 1024, // 10MB
    acceptedFileTypes: getAcceptedFileTypes(selectedConverter)
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
                <Badge variant="secondary" className="text-xs">
                  {getConverterTypeLabel(selectedConverter.inputType)}
                </Badge>
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

            {/* Dynamic Converter Interface */}
            <DynamicConverterUI
              converter={converterConfig}
              onConvert={handleConvert}
              loading={loading}
              inputValue={inputValue}
              setInputValue={setInputValue}
              outputValue={outputValue}
              options={options}
              setOptions={setOptions}
              onClear={handleClear}
              onCopy={handleCopy}
              copied={copied}
            />

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
}

// Helper functions for converter configuration
function getInputPlaceholder(converter: Converter): string {
  switch (converter.id) {
    case 'regex-test':
      return 'Enter text to test against your regular expression...';
    case 'csv-to-json':
      return 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles';
    case 'json-to-csv':
      return '[{"name":"John","age":30},{"name":"Jane","age":25}]';
    case 'css-minify':
    case 'css-format':
      return '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}';
    case 'sql-format':
      return 'SELECT users.name, orders.total FROM users LEFT JOIN orders ON users.id = orders.user_id WHERE users.active = 1 ORDER BY orders.total DESC';
    case 'json-format':
    case 'json-minify':
      return '{"name": "John", "age": 30, "hobbies": ["reading", "gaming"]}';
    case 'qr-generate':
      return 'Hello World';
    default:
      return 'Enter your input here...';
  }
}

function getInputLabel(converter: Converter): string {
  switch (converter.inputType) {
    case 'generator':
      return 'Generator Settings';
    case 'options':
      return 'Input & Configuration';
    case 'file':
      return 'File Upload';
    case 'multiline':
      return 'Code Input';
    case 'json':
      return 'JSON Input';
    default:
      return 'Input';
  }
}

function getOutputLabel(converter: Converter): string {
  switch (converter.id) {
    case 'qr-generate':
      return 'QR Code';
    case 'regex-test':
      return 'Test Results';
    case 'password-generate':
      return 'Generated Password';
    case 'uuid-generate':
      return 'Generated UUID';
    case 'lorem-generate':
      return 'Generated Text';
    default:
      return 'Output';
  }
}

function getOutputType(converter: Converter): 'text' | 'json' | 'qr' | 'image' {
  switch (converter.id) {
    case 'qr-generate':
      return 'qr';
    default:
      return 'text';
  }
}

function getInputFields(converter: Converter): InputField[] {
  switch (converter.id) {
    case 'password-generate':
      return [
        {
          name: 'length',
          label: 'Password Length',
          type: 'range',
          defaultValue: 16,
          min: 4,
          max: 128,
          description: 'Length of the generated password'
        },
        {
          name: 'includeUppercase',
          label: 'Include Uppercase Letters (A-Z)',
          type: 'checkbox',
          defaultValue: true,
          description: 'Include uppercase letters in the password'
        },
        {
          name: 'includeLowercase',
          label: 'Include Lowercase Letters (a-z)',
          type: 'checkbox',
          defaultValue: true,
          description: 'Include lowercase letters in the password'
        },
        {
          name: 'includeNumbers',
          label: 'Include Numbers (0-9)',
          type: 'checkbox',
          defaultValue: true,
          description: 'Include numbers in the password'
        },
        {
          name: 'includeSymbols',
          label: 'Include Symbols (!@#$%^&*)',
          type: 'checkbox',
          defaultValue: true,
          description: 'Include special symbols in the password'
        },
        {
          name: 'excludeSimilar',
          label: 'Exclude Similar Characters (0,O,l,I)',
          type: 'checkbox',
          defaultValue: false,
          description: 'Avoid confusing characters like 0, O, l, I'
        }
      ];

    case 'qr-generate':
      return [
        {
          name: 'size',
          label: 'QR Code Size',
          type: 'range',
          defaultValue: 200,
          min: 100,
          max: 500,
          description: 'Size of the QR code in pixels'
        },
        {
          name: 'errorLevel',
          label: 'Error Correction Level',
          type: 'select',
          defaultValue: 'M',
          options: [
            { label: 'Low (L) - ~7%', value: 'L' },
            { label: 'Medium (M) - ~15%', value: 'M' },
            { label: 'Quartile (Q) - ~25%', value: 'Q' },
            { label: 'High (H) - ~30%', value: 'H' }
          ],
          description: 'Higher levels can recover from more damage'
        }
      ];

    case 'lorem-generate':
      return [
        {
          name: 'wordCount',
          label: 'Word Count',
          type: 'range',
          defaultValue: 50,
          min: 10,
          max: 500,
          description: 'Number of words to generate'
        }
      ];

    case 'regex-test':
      return [
        {
          name: 'pattern',
          label: 'Regular Expression Pattern',
          type: 'text',
          placeholder: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
          required: true,
          description: 'Enter your regex pattern (without delimiters)'
        },
        {
          name: 'flags',
          label: 'Regex Flags',
          type: 'text',
          placeholder: 'gi',
          defaultValue: 'g',
          description: 'g=global, i=ignoreCase, m=multiline, s=dotAll, u=unicode, y=sticky'
        },
        {
          name: 'showMatches',
          label: 'Show Match Details',
          type: 'checkbox',
          defaultValue: true,
          description: 'Display matched groups and positions'
        }
      ];

    case 'sql-format':
      return [
        {
          name: 'uppercase',
          label: 'Uppercase Keywords',
          type: 'checkbox',
          defaultValue: true,
          description: 'Convert SQL keywords to uppercase'
        }
      ];

    case 'css-format':
      return [
        {
          name: 'indentSize',
          label: 'Indent Size',
          type: 'range',
          defaultValue: 2,
          min: 2,
          max: 8,
          description: 'Number of spaces for indentation'
        }
      ];

    case 'csv-to-json':
      return [
        {
          name: 'delimiter',
          label: 'CSV Delimiter',
          type: 'select',
          defaultValue: ',',
          options: [
            { label: 'Comma (,)', value: ',' },
            { label: 'Semicolon (;)', value: ';' },
            { label: 'Tab', value: '\t' },
            { label: 'Pipe (|)', value: '|' }
          ],
          description: 'Character that separates CSV values'
        },
        {
          name: 'hasHeader',
          label: 'First Row Contains Headers',
          type: 'checkbox',
          defaultValue: true,
          description: 'Use first row as JSON object keys'
        }
      ];

    case 'json-to-csv':
      return [
        {
          name: 'delimiter',
          label: 'CSV Delimiter',
          type: 'select',
          defaultValue: ',',
          options: [
            { label: 'Comma (,)', value: ',' },
            { label: 'Semicolon (;)', value: ';' },
            { label: 'Tab', value: '\t' },
            { label: 'Pipe (|)', value: '|' }
          ],
          description: 'Character to separate CSV values'
        }
      ];

    case 'json-format':
      return [
        {
          name: 'indent',
          label: 'Indentation',
          type: 'range',
          defaultValue: 2,
          min: 1,
          max: 8,
          description: 'Number of spaces for indentation'
        }
      ];

    default:
      return [];
  }
}

function getAllowFileUpload(converter: Converter): boolean {
  const fileUploadConverters = [
    'css-format', 'css-minify', 'sql-format', 
    'json-format', 'json-minify', 'csv-to-json'
  ];
  return fileUploadConverters.includes(converter.id);
}

function getAcceptedFileTypes(converter: Converter): string[] {
  switch (converter.category) {
    case 'css-tools':
      return ['.css', '.scss', '.less'];
    case 'database-tools':
      return ['.sql'];
    case 'data-formats':
      return ['.json', '.csv', '.xml', '.yaml', '.yml'];
    default:
      return ['.txt'];
  }
}

function getConverterTypeLabel(inputType?: string): string {
  switch (inputType) {
    case 'generator':
      return 'Generator';
    case 'options':
      return 'Advanced';
    case 'file':
      return 'File Tool';
    case 'multiline':
      return 'Code Tool';
    case 'regex':
      return 'Tester';
    default:
      return 'Tool';
  }
}