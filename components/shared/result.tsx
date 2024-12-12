"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui";

import Link from "next/link";
import { f1, f2, h, x1, x2, y1, y2 } from "@/lib/constants";
import { TableResultDerivatives } from "./table-result-derivatives";
import {
  compareSolutions,
  derivativeAtPoints,
  firstDerivativeFirstOrderBackward,
  firstDerivativeFirstOrderForward,
  firstDerivativeSecondOrder,
  secondDerivativeSecondOrder,
  theoreticalErrorFirstDerivativeFirstOrder,
  theoreticalErrorFirstDerivativeSecondOrder,
  theoreticalErrorSecondDerivativeSecondOrder,
} from "@/lib/derivatives";
import { TableComparisonExactValue } from "./table-comparison-exact-value";
import { TableComparisonTheoreticalErrorEstimate } from "./table-comparison-theoretical-error-estimate";

interface Props {
  id: string;
  className?: string;
}

export const Result: React.FC<Props> = ({ className, id }) => {
  const [isOpenSolution, setIsOpenSolution] = useState<boolean>(false);

  const values = {
    x: id === "1" ? x1 : x2,
    y: id === "1" ? y1 : y2,
    f: id === "1" ? f1 : f2,
  };

  const onClickToggleSolution = () => {
    setIsOpenSolution(!isOpenSolution);
  };

  // вычисление производных
  const firstDerivativeFirstOrderForwardValue =
    firstDerivativeFirstOrderForward(values.y, h);
  const firstDerivativeFirstOrderBackwardValue =
    firstDerivativeFirstOrderBackward(values.y, h);
  const firstDerivativeSecondOrderValue = firstDerivativeSecondOrder(
    values.y,
    h
  );
  const secondDerivativeSecondOrderValue = secondDerivativeSecondOrder(
    values.y,
    h
  );

  // вычисление первой и второй производной функции
  const derivativeAtPointsValue = derivativeAtPoints(values.f, values.x, 1, h);
  const secondDerivativeAtPointsValue = derivativeAtPoints(
    values.f,
    values.x,
    2,
    h,
    3
  );

  // Вычисление разности полученных численных решений с точными значениями
  const compareSolutionsWithFirstDerivativeFirstOrderForwardValue =
    compareSolutions(
      firstDerivativeFirstOrderForwardValue,
      derivativeAtPointsValue
    );
  const compareSolutionsWithFirstDerivativeFirstOrderBackwardValue =
    compareSolutions(
      firstDerivativeFirstOrderBackwardValue,
      derivativeAtPointsValue
    );
  const compareSolutionsWithFirstDerivativeSecondOrderValue = compareSolutions(
    firstDerivativeSecondOrderValue,
    derivativeAtPointsValue
  );

  const compareSolutionsWithSecondDerivativeSecondOrderValue = compareSolutions(
    secondDerivativeSecondOrderValue,
    secondDerivativeAtPointsValue
  );

  // Вычисление теоритической погррешности
  const theoreticalErrorFirstDerivativeFirstOrderForwardValue =
    theoreticalErrorFirstDerivativeFirstOrder(values.f, values.x, h, 1);
  const theoreticalErrorFirstDerivativeFirstOrderBackwardValue =
    theoreticalErrorFirstDerivativeFirstOrder(values.f, values.x, h, 2);

  const theoreticalErrorFirstDerivativeSecondOrderValue =
    theoreticalErrorFirstDerivativeSecondOrder(values.f, values.x, h);
  const theoreticalErrorSecondDerivativeSecondOrderValue =
    theoreticalErrorSecondDerivativeSecondOrder(values.f, values.x, h);

  return (
    <div className={cn(className)}>
      <Link
        href={`/equation/${id === "1" ? "test" : "1"}`}
        className="text-base mt-4 mr-2"
      >
        <Button className="text-base mt-4" variant={"outline"}>
          {id === "1" ? "Вперед" : "Назад"}
        </Button>
      </Link>
      <Button className="text-base mt-4" onClick={onClickToggleSolution}>
        {isOpenSolution ? "Отменить" : "Вычислить"}
      </Button>

      {isOpenSolution && (
        <>
          <TableResultDerivatives
            title="Вычисление первой производной с первым порядком точности, используя направленные разности «вперед»"
            derivativesValue={firstDerivativeFirstOrderForwardValue}
            xValue={values.x}
            yValue={values.y}
          />
          <TableResultDerivatives
            title="Вычисление первой производной с первым порядком точности, используя направленные разности «назад»"
            derivativesValue={firstDerivativeFirstOrderBackwardValue}
            xValue={values.x}
            yValue={values.y}
          />
          <TableResultDerivatives
            title="Вычисление первой производной со вторым порядком точности"
            derivativesValue={firstDerivativeSecondOrderValue}
            xValue={values.x}
            yValue={values.y}
          />
          <TableResultDerivatives
            title="Вычисление второй производной"
            derivativesValue={secondDerivativeSecondOrderValue}
            xValue={values.x}
            yValue={values.y}
            isDouble
          />
          <TableComparisonExactValue
            title="Сравнение полученных численных решений с точными значениями"
            xValue={values.x}
            exactSolutions={derivativeAtPointsValue}
            compareSolutionsWithFirstDerivativeFirstOrderForwardValue={
              compareSolutionsWithFirstDerivativeFirstOrderForwardValue
            }
            compareSolutionsWithFirstDerivativeFirstOrderBackwardValue={
              compareSolutionsWithFirstDerivativeFirstOrderBackwardValue
            }
            compareSolutionsWithFirstDerivativeSecondOrderValue={
              compareSolutionsWithFirstDerivativeSecondOrderValue
            }
          />
          <TableComparisonExactValue
            title="Сравнение полученных численных решений с точными значениями"
            xValue={values.x}
            exactSolutions={secondDerivativeAtPointsValue}
            compareSolutionsWithSecondDerivativeSecondOrderValue={
              compareSolutionsWithSecondDerivativeSecondOrderValue
            }
            isDouble
          />
          <TableComparisonTheoreticalErrorEstimate
            title="Сопоставление с теоретической оценкой погрешности для вычисления первой производной с первым порядком точности, используя направленные разности «вперед»"
            xValue={values.x}
            theoreticalError={
              theoreticalErrorFirstDerivativeFirstOrderForwardValue
            }
            compareSolutions={
              compareSolutionsWithFirstDerivativeFirstOrderForwardValue
            }
          />
          <TableComparisonTheoreticalErrorEstimate
            title="Сопоставление с теоретической оценкой погрешности для вычисления первой производной с первым порядком точности, используя направленные разности «назад»"
            xValue={values.x}
            theoreticalError={
              theoreticalErrorFirstDerivativeFirstOrderBackwardValue
            }
            compareSolutions={
              compareSolutionsWithFirstDerivativeFirstOrderBackwardValue
            }
          />
          <TableComparisonTheoreticalErrorEstimate
            title="Сопоставление с теоретической оценкой погрешности для вычисления первой производной со вторым порядком точности"
            xValue={values.x}
            theoreticalError={theoreticalErrorFirstDerivativeSecondOrderValue}
            compareSolutions={
              compareSolutionsWithFirstDerivativeSecondOrderValue
            }
            isSecondOrder
          />
          <TableComparisonTheoreticalErrorEstimate
            title="Сопоставление с теоретической оценкой погрешности для вычисления второй производной"
            xValue={values.x}
            theoreticalError={theoreticalErrorSecondDerivativeSecondOrderValue}
            compareSolutions={
              compareSolutionsWithSecondDerivativeSecondOrderValue
            }
            isDouble
          />
        </>
      )}
    </div>
  );
};
