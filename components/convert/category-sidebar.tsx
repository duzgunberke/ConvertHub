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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:relative inset-y-0 left-0 z-50 w-[340px] bg-card/95 backdrop-blur-xl border-r border-border/50 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gradient-primary mb-1">
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
                className="lg:hidden h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {categories.map((category) => {
                const isExpanded = expandedCategories.has(category.id);
                const isSelected = selectedCategory.id === category.id;

                return (
                  <div key={category.id} className="space-y-2">
                    {/* Category Header */}
                    <div className="relative">
                      <button
                        onClick={() => handleCategorySelect(category)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group hover:bg-muted/60 hover:shadow-md",
                          isSelected && "bg-primary/10 shadow-lg ring-1 ring-primary/20"
                        )}
                      >
                        <span className="text-xl flex-shrink-0">{category.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={cn(
                            "font-semibold text-sm transition-colors truncate",
                            isSelected ? "text-primary" : "group-hover:text-primary"
                          )}>
                            {category.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {category.converters.length} tools
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            {category.converters.length}
                          </Badge>
                        </div>
                      </button>
                      
                      {/* Separate toggle button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCategory(category.id);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted/40 transition-colors opacity-60 hover:opacity-100"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </button>
                    </div>

                    {/* Converters List */}
                    {isExpanded && (
                      <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {category.converters.map((converter) => {
                          const isConverterSelected = selectedConverter.id === converter.id;
                          
                          return (
                            <button
                              key={converter.id}
                              onClick={() => onConverterSelect(converter)}
                              className={cn(
                                "w-full flex items-center gap-3 p-2.5 rounded-lg text-sm transition-all duration-200 text-left hover:bg-muted/40",
                                isConverterSelected && "bg-primary/15 text-primary font-medium border border-primary/30 shadow-sm"
                              )}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{converter.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1">
                                  {converter.description}
                                </div>
                              </div>
                              {converter.featured && (
                                <Badge variant="outline" className="text-xs px-1.5 py-0.5 flex-shrink-0">
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
          <div className="p-4 border-t border-border/50 bg-gradient-to-r from-secondary/20 to-accent/10">
            <div className="text-center">
              <div className="text-sm font-medium text-foreground/80">200+ conversion tools</div>
              <div className="text-xs text-primary font-semibold mt-1">Professional Edition</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};