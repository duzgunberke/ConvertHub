import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Converter } from "@/models/converter";

interface ConverterCardProps {
  converter: Converter;
  onClick: () => void;
}

export const ConverterCard = ({ converter, onClick }: ConverterCardProps) => {
  return (
    <Card 
      className="p-6 glass hover:shadow-glow transition-all duration-300 group cursor-pointer hover:scale-105 hover:bg-card/80 relative"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                {converter.name}
              </h4>
              {converter.featured && (
                <Star className="h-4 w-4 text-warning fill-warning flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {converter.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {converter.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {converter.tags.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{converter.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted/40">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};