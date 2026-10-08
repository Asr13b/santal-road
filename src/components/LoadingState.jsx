export default function LoadingState({ message = "መረጃ በመጫን ላይ..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-14 h-14 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-600 animate-spin" />
      </div>
      <p className="text-gray-600 text-base text-center">{message}</p>
    </div>
  );
}
