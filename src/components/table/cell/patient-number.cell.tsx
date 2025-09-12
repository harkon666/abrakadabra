const PatientNumberCell = ({
  patientNo,
}: {
  patientNo: string | undefined;
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-primary rounded-full"></div>
      <span className="font-mono text-xs font-medium text-foreground">
        {patientNo}
      </span>
    </div>
  );
};
export default PatientNumberCell;
