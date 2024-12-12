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
  compareSolutionsWithFirstDerivativeFirstOrderForwardValue?: (number | null)[];
  compareSolutionsWithFirstDerivativeFirstOrderBackwardValue?: (
    | number
    | null
  )[];
  compareSolutionsWithFirstDerivativeSecondOrderValue?: (number | null)[];
  compareSolutionsWithSecondDerivativeSecondOrderValue?: (number | null)[];
  xValue: number[];
  exactSolutions: (number | null)[];
  isDouble?: boolean;
}

export const TableComparisonExactValue: React.FC<Props> = ({
  title,
  compareSolutionsWithFirstDerivativeFirstOrderForwardValue,
  compareSolutionsWithFirstDerivativeFirstOrderBackwardValue,
  compareSolutionsWithFirstDerivativeSecondOrderValue,
  compareSolutionsWithSecondDerivativeSecondOrderValue,
  xValue,
  exactSolutions,
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

            <TableHead>
              <p className="text-nowrap">
                точное y
                <span>
                  <sub>i</sub>
                  <sup>
                    &apos; {isDouble && <span>&apos;</span>}
                    <sup className="text-base">*</sup>
                  </sup>
                </span>
              </p>
            </TableHead>

            {isDouble ? (
              <TableHead>
                <p className="text-nowrap pt-2">
                  &Delta; y{" "}
                  <span>
                    <sub>i</sub>
                    <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                  </span>{" "}
                  = |
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
            ) : (
              <>
                <TableHead>
                  <p className="text-nowrap pt-2">
                    &Delta; y{" "}
                    <span>
                      <sub>i</sub>
                      <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                    </span>{" "}
                    = |
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
                    <br />
                    Направленная разность «вперед»
                  </p>
                </TableHead>
                <TableHead>
                  <p className="text-nowrap pt-2">
                    &Delta; y{" "}
                    <span>
                      <sub>i</sub>
                      <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                    </span>{" "}
                    = |
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
                    <br />
                    Направленная разность «назад»
                  </p>
                </TableHead>
                <TableHead>
                  <p className="text-nowrap pt-2">
                    &Delta; y{" "}
                    <span>
                      <sub>i</sub>
                      <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                    </span>{" "}
                    = |
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
                    <br />
                    Симметричная разность
                  </p>
                </TableHead>
              </>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {xValue.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{item}</TableCell>
              <TableCell>{exactSolutions[index]}</TableCell>
              {isDouble ? (
                <TableCell>
                  {
                    compareSolutionsWithSecondDerivativeSecondOrderValue?.[
                      index
                    ]
                  }
                </TableCell>
              ) : (
                <>
                  <TableCell>
                    {
                      compareSolutionsWithFirstDerivativeFirstOrderForwardValue?.[
                        index
                      ]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      compareSolutionsWithFirstDerivativeFirstOrderBackwardValue?.[
                        index
                      ]
                    }
                  </TableCell>
                  <TableCell>
                    {
                      compareSolutionsWithFirstDerivativeSecondOrderValue?.[
                        index
                      ]
                    }
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={3}>
              <p className="text-nowrap pt-2 text-right">
                &Delta; y <sup>&apos; {isDouble && <span>&apos;</span>}</sup>=
                max &Delta; y{" "}
                <span>
                  <sub>i</sub>
                  <sup>&apos; {isDouble && <span>&apos;</span>}</sup>
                </span>{" "}
              </p>
            </TableCell>

            {isDouble ? (
              <TableCell>
                {Math.max(
                  ...(
                    compareSolutionsWithSecondDerivativeSecondOrderValue ?? []
                  ).filter((x) => x !== null)
                )}
              </TableCell>
            ) : (
              <>
                <TableCell>
                  {Math.max(
                    ...(
                      compareSolutionsWithFirstDerivativeFirstOrderForwardValue ??
                      []
                    ).filter((x) => x !== null)
                  )}
                </TableCell>
                <TableCell>
                  {Math.max(
                    ...(
                      compareSolutionsWithFirstDerivativeFirstOrderBackwardValue ??
                      []
                    ).filter((x) => x !== null)
                  )}
                </TableCell>
                <TableCell>
                  {Math.max(
                    ...(
                      compareSolutionsWithFirstDerivativeSecondOrderValue ?? []
                    ).filter((x) => x !== null)
                  )}
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
