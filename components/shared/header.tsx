import { BoundaryConditions, TableValuesConditions } from "@/components/shared";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, id }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <BoundaryConditions id={id} />
      <TableValuesConditions id={id} />
    </div>
  );
};
