export default function Alert({ type = "info", message, children }) {
  const styles = {
    error: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div className={`rounded-lg p-4 ${styles[type]}`}>
      <p className="text-center">{message || children}</p>
    </div>
  );
}
