import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Upload, Copy, Check, RotateCcw, Play, Shuffle, Clock } from 'lucide-react';
import { ConverterConfig, InputField, ConverterInputType } from '@/types/converter';
import { cn } from '@/lib/utils';

interface DynamicConverterUIProps {
  converter: ConverterConfig;
  onConvert: (input?: string, options?: Record<string, any>) => Promise<void>;
  loading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  outputValue: string;
  options: Record<string, any>;
  setOptions: (options: Record<string, any>) => void;
  onClear: () => void;
  onCopy: () => void;
  copied: boolean;
}

export const DynamicConverterUI: React.FC<DynamicConverterUIProps> = ({
  converter,
  onConvert,
  loading,
  inputValue,
  setInputValue,
  outputValue,
  options,
  setOptions,
  onClear,
  onCopy,
  copied
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
    
    if (selectedFiles.length > 0 && converter.inputType !== 'file') {
      // For single file, read content into input
      const file = selectedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputValue(content);
      };
      reader.readAsText(file);
    }
  }, [converter.inputType, setInputValue]);

  const handleOptionChange = useCallback((fieldName: string, value: any) => {
    setOptions({ ...options, [fieldName]: value });
  }, [options, setOptions]);

  const renderInputField = (field: InputField) => {
    const value = options[field.name] || field.defaultValue;

    switch (field.type) {
      case 'text':
        return (
          <Input
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => handleOptionChange(field.name, e.target.value)}
            disabled={loading}
          />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value || ''}
            min={field.min}
            max={field.max}
            onChange={(e) => handleOptionChange(field.name, parseInt(e.target.value) || 0)}
            disabled={loading}
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={(val) => handleOptionChange(field.name, val)}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={value || false}
              onCheckedChange={(checked) => handleOptionChange(field.name, checked)}
              disabled={loading}
            />
            <Label className="text-sm">{field.label}</Label>
          </div>
        );
      
      case 'range':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{field.min}</span>
              <span className="font-medium">{value}</span>
              <span>{field.max}</span>
            </div>
            <Slider
              value={[value || field.defaultValue || field.min || 0]}
              onValueChange={(values) => handleOptionChange(field.name, values[0])}
              min={field.min}
              max={field.max}
              step={1}
              disabled={loading}
            />
          </div>
        );
      
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => handleOptionChange(field.name, e.target.value)}
              className="w-12 h-10 rounded border border-input"
              disabled={loading}
            />
            <Input
              value={value || '#000000'}
              onChange={(e) => handleOptionChange(field.name, e.target.value)}
              placeholder="#000000"
              disabled={loading}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderInputSection = () => {
    switch (converter.inputType) {
      case 'generator':
        return (
          <Card className="p-6 space-y-4 glass shadow-card">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎲</div>
              <h3 className="text-xl font-semibold">Generator Ready</h3>
              <p className="text-muted-foreground">
                This tool generates content automatically. Click generate to create new output.
              </p>
              
              {/* Options for generators */}
              {converter.inputFields && converter.inputFields.length > 0 && (
                <div className="space-y-4 text-left">
                  <h4 className="font-medium">Options</h4>
                  {converter.inputFields.map(field => (
                    <div key={field.name} className="space-y-2">
                      <Label className="text-sm font-medium">{field.label}</Label>
                      {renderInputField(field)}
                      {field.description && (
                        <p className="text-xs text-muted-foreground">{field.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              <Button
                onClick={() => onConvert(undefined, options)}
                disabled={loading}
                className="w-full h-11 text-base font-medium"
                size="lg"
              >
                {loading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Shuffle className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </Card>
        );

      case 'options':
        return (
          <Card className="p-6 space-y-4 glass shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {converter.inputLabel || 'Configuration'}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                disabled={loading}
                className="h-8"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Input text section - ALWAYS show for options type */}
            <div className="space-y-2">
              <Label>Input Text</Label>
              <Textarea
                placeholder={converter.inputPlaceholder || "Enter your input..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-h-[150px] bg-background/50 font-mono text-sm border-border/50 resize-none"
                disabled={loading}
              />
            </div>

            {/* Configuration Options */}
            {converter.inputFields && converter.inputFields.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                <Label className="text-base font-semibold">Options</Label>
                {converter.inputFields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-sm font-medium">{field.label}</Label>
                    {renderInputField(field)}
                    {field.description && (
                      <p className="text-xs text-muted-foreground">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => onConvert(inputValue, options)}
              disabled={!inputValue.trim() || loading}
              className="w-full h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Convert
                </>
              )}
            </Button>
          </Card>
        );

      case 'file':
        return (
          <Card className="p-6 space-y-4 glass shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">File Upload</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                disabled={loading}
                className="h-8"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">Upload your file</p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: {converter.acceptedFileTypes?.join(', ') || 'Various'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Max size: {((converter.maxFileSize || 0) / (1024 * 1024)).toFixed(1)}MB
                </p>
              </div>
              
              <label className="cursor-pointer">
                <Button variant="outline" className="cursor-pointer" disabled={loading}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept={converter.acceptedFileTypes?.join(',')}
                  disabled={loading}
                  multiple={converter.inputType === 'file'}
                />
              </label>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Files:</p>
                {files.map((file, index) => (
                  <div key={index} className="text-sm text-muted-foreground bg-muted/30 p-2 rounded">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => onConvert(inputValue, { ...options, files })}
              disabled={loading || files.length === 0}
              className="w-full h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Convert File'
              )}
            </Button>
          </Card>
        );

      default: // 'text', 'multiline', 'json', etc.
        return (
          <Card className="p-6 space-y-4 glass shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {converter.inputLabel || 'Input'}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClear}
                  className="h-8"
                  disabled={loading}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                {converter.allowFileUpload && (
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
                      accept={converter.acceptedFileTypes?.join(',')}
                      disabled={loading}
                    />
                  </label>
                )}
              </div>
            </div>
            
            <Textarea
              placeholder={converter.inputPlaceholder || "Enter your input here..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={cn(
                "bg-background/50 font-mono text-sm border-border/50 resize-none",
                converter.inputType === 'multiline' ? "min-h-[400px]" : "min-h-[300px]"
              )}
              disabled={loading}
            />

            {/* Additional input fields */}
            {converter.inputFields && converter.inputFields.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                <Label className="text-sm font-semibold">Options</Label>
                {converter.inputFields.map(field => (
                  <div key={field.name} className="space-y-2">
                    <Label className="text-sm">{field.label}</Label>
                    {renderInputField(field)}
                    {field.description && (
                      <p className="text-xs text-muted-foreground">{field.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <Button
              onClick={() => onConvert(inputValue, options)}
              disabled={!inputValue.trim() || loading}
              className="w-full h-11 text-base font-medium"
            >
              {loading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                'Convert'
              )}
            </Button>
          </Card>
        );
    }
  };

  const renderOutputSection = () => (
    <Card className="p-6 space-y-4 glass shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {converter.outputLabel || 'Output'}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onCopy}
          disabled={!outputValue || loading}
          className="h-8"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied!" : converter.outputType === 'qr' ? 'Copy URL' : 'Copy'}
        </Button>
      </div>
      
      {converter.outputType === 'qr' ? (
        <div className="flex justify-center p-8 bg-white rounded-lg min-h-[300px] items-center">
          {outputValue ? (
            <div className="text-center space-y-4">
              <img 
                src={outputValue} 
                alt="QR Code" 
                className="max-w-full h-auto mx-auto shadow-lg rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjYwIiB5PSIyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMDAwIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIvPgo8L3N2Zz4K';
                  console.error('QR Code failed to load');
                }}
              />
              <div className="text-sm text-gray-600">
                <p>QR Code generated successfully</p>
                <p className="text-xs mt-1">Right-click to save image</p>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground text-center">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-lg font-medium">QR Code Preview</p>
              <p className="text-sm mt-2">Enter text and click Convert to generate QR code</p>
            </div>
          )}
        </div>
      ) : converter.outputType === 'image' ? (
        <div className="flex justify-center p-8 bg-muted/20 rounded-lg">
          {outputValue ? (
            <img src={outputValue} alt="Generated Image" className="max-w-full h-auto" />
          ) : (
            <div className="text-muted-foreground text-center">
              <div className="text-6xl mb-2">🖼️</div>
              <p>Image will appear here</p>
            </div>
          )}
        </div>
      ) : (
        <Textarea
          placeholder="Output will appear here..."
          value={outputValue}
          readOnly
          className="min-h-[350px] bg-background/30 font-mono text-sm border-border/50 resize-none"
        />
      )}
      
      <div className="h-11 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {outputValue ? `${outputValue.length} characters` : "Ready to convert"}
        </span>
      </div>
    </Card>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {renderInputSection()}
      {renderOutputSection()}
    </div>
  );
};