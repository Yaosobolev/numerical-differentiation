interface Props {
  id: string;
}

export const BoundaryConditions: React.FC<Props> = ({ id }) => {
  const values =
    id === "1" ? (
      <p>y = ln(x + 3)</p>
    ) : (
      <p>
        y = sinx <sup>2</sup>
      </p>
    );

  return (
    <>
      <h2 className="text-xl">
        Аналитически заданные функции (для оценки погрешности полученных
        решений)
      </h2>
      {values}
    </>
  );
};
