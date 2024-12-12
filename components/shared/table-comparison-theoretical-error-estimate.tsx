import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  title: string;
  theoreticalError: (number | null)[];
  compareSolutions: (number | null)[];
  xValue: number[];
  isDouble?: boolean;
  isSecondOrder?: boolean;
}
export const TableComparisonTheoreticalErrorEstimate: React.FC<Props> = ({
  title,
  theoreticalError,
  xValue,
  compareSolutions,
  isDouble,
  isSecondOrder,
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

            <TableHead>
              Теоретическая погрешность |E <sub>i</sub>|
            </TableHead>

            <TableHead>
              <p className="text-nowrap pt-2">
                |
                <span>
                  y <sub>i</sub>
                  <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                </span>
                -
                <span className="m-1">
                  y <sub>i</sub>
                  <sup>
                    &apos; {isDouble && <span>&apos;</span>}
                    <sup className="text-base">*</sup>
                  </sup>
                </span>
                |
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {xValue.map((item, index) => (
            <TableRow key={item}>
              <TableCell>{index}</TableCell>
              <TableCell>{item}</TableCell>
              <TableCell>{theoreticalError[index]}</TableCell>
              <TableCell>{compareSolutions[index]}</TableCell>
            </TableRow>
          ))}
          {isSecondOrder ? (
            <>
              <TableRow>
                <TableCell>
                  <p className="text-nowrap">i = 0</p>
                </TableCell>
                <TableCell />
                <TableCell>
                  <p className="text-nowrap"> |E| &le; {theoreticalError[0]}</p>
                </TableCell>
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    &Delta; y{" "}
                    <sup>&apos; {isDouble && <span>&apos;</span>}</sup>={" "}
                    {compareSolutions[0]}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p className="text-nowrap">
                    i = <span className="border-t">1, {xValue.length - 2}</span>
                  </p>
                </TableCell>
                <TableCell />
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    |E| &le;{" "}
                    {Math.max(
                      ...(theoreticalError ?? [])
                        .filter((x) => x !== null)
                        .slice(1, -1)
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    &Delta; y{" "}
                    <sup>&apos; {isDouble && <span>&apos;</span>}</sup>={" "}
                    {Math.max(
                      ...(compareSolutions ?? [])
                        .filter((x) => x !== null)
                        .slice(1, -1)
                    )}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p className="text-nowrap">i = {xValue.length - 1}</p>
                </TableCell>
                <TableCell />
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    |E| &le; {theoreticalError[xValue.length - 1]}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    &Delta; y{" "}
                    <sup>&apos; {isDouble && <span>&apos;</span>}</sup>={" "}
                    {compareSolutions[xValue.length - 1]}
                  </p>
                </TableCell>
              </TableRow>
            </>
          ) : (
            <>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell>
                  <p className="text-nowrap">
                    |E| &le;{" "}
                    {Math.max(
                      ...(theoreticalError ?? []).filter((x) => x !== null)
                    )}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-nowrap">
                    {" "}
                    &Delta; y{" "}
                    <sup>&apos; {isDouble && <span>&apos;</span>}</sup>={" "}
                    {Math.max(
                      ...(compareSolutions ?? []).filter((x) => x !== null)
                    )}
                  </p>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </>
  );
};
