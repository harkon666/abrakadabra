const NIKCell = ({ nik }: { nik: string }) => {
  const maskedNIK = nik.substring(0, 6) + "****" + nik.substring(12);

  return (
    <div className="font-mono text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded border">
      {maskedNIK}
    </div>
  );
};
export default NIKCell;
