import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

interface Props {
  title: string;
  derivativesValue: (number | null)[];
  xValue: number[];
  yValue: number[];
  isDouble?: boolean;
}

export const TableResultDerivatives: React.FC<Props> = ({
  title,
  derivativesValue,
  xValue,
  yValue,
  isDouble,
}) => {
  return (
    <>
      <h2 className="text-xl mt-7">{title}</h2>
      <Table className="w-[300px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">i</TableHead>
            <TableHead className="w-[100px]">
              x <sub>i</sub>
            </TableHead>
            <TableHead className="w-[100px]">
              y <sub>i</sub>
            </TableHead>
            <TableHead>
              <p className="text-nowrap">
                y
                <span>
                  <sub>i</sub>
                  <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                </span>
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {xValue.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{item}</TableCell>
              <TableCell>{yValue[index]}</TableCell>
              <TableCell>{derivativesValue?.[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
