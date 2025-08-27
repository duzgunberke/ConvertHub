import { useState } from "react";
import { ChevronRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Category, Converter } from "@/models/converter";

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: Category;
  selectedConverter: Converter;
  isOpen: boolean;
  onCategorySelect: (category: Category) => void;
  onConverterSelect: (converter: Converter) => void;
  onToggle: () => void;
}

export const CategorySidebar = ({
  categories,
  selectedCategory,
  selectedConverter,
  isOpen,
  onCategorySelect,
  onConverterSelect,
  onToggle
}: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set([selectedCategory.id])
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (category: Category) => {
    onCategorySelect(category);
    if (!expandedCategories.has(category.id)) {
      toggleCategory(category.id);
    }
    // Select first converter in category
    if (category.converters.length > 0) {
      onConverterSelect(category.converters[0]);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border bg-gradient-secondary">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gradient-primary">
                  ConvertHub
                </h2>
                <p className="text-sm text-muted-foreground">
                  Professional Developer Tools
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {categories.map((category) => {
                const isExpanded = expandedCategories.has(category.id);
                const isSelected = selectedCategory.id === category.id;

                return (
                  <div key={category.id} className="space-y-1">
                    {/* Category Header */}
                    <button
                      onClick={() => handleCategorySelect(category)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left group hover:bg-muted/50",
                        isSelected && "bg-muted shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-lg">{category.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium group-hover:text-primary transition-colors">
                            {category.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {category.count} tools
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {category.converters.length}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(category.id);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          {isExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </button>

                    {/* Converters List */}
                    {isExpanded && (
                      <div className="ml-6 space-y-1 animate-slide-in">
                        {category.converters.map((converter) => {
                          const isConverterSelected = selectedConverter.id === converter.id;
                          
                          return (
                            <button
                              key={converter.id}
                              onClick={() => onConverterSelect(converter)}
                              className={cn(
                                "w-full flex items-center gap-2 p-2 rounded-md text-sm transition-all duration-200 text-left hover:bg-muted/30",
                                isConverterSelected && "bg-primary/10 text-primary font-medium border border-primary/20"
                              )}
                            >
                              <div className="flex-1">
                                <div className="font-medium">{converter.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">
                                  {converter.description}
                                </div>
                              </div>
                              {converter.featured && (
                                <Badge variant="outline" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-gradient-secondary">
            <div className="text-center text-xs text-muted-foreground">
              <div>200+ conversion tools</div>
              <div className="mt-1 text-primary">Professional Edition</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};