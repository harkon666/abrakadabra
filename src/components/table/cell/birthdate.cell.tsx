import { Calendar } from "lucide-react";

const BirthDateCell = ({ birthDate }: { birthDate: string }) => {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(birthDate);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Calendar className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs">{birthDate}</span>
      </div>
      <div className="text-xs text-muted-foreground">{age} tahun</div>
    </div>
  );
};

export default BirthDateCell;
