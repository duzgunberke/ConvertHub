import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Converter } from "@/models/converter";

interface ConverterCardProps {
  converter: Converter;
  onClick: () => void;
}

export const ConverterCard = ({ converter, onClick }: ConverterCardProps) => {
  return (
    <Card className="p-4 glass hover:shadow-glow transition-all duration-300 group cursor-pointer">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold group-hover:text-primary transition-colors">
                {converter.name}
              </h4>
              {converter.featured && (
                <Star className="h-4 w-4 text-warning fill-warning" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {converter.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {converter.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {converter.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{converter.tags.length - 2}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};