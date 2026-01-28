export default function Sidebar() {
  return (
    <div className="w-64 bg-[#25293c] h-screen p-5 fixed">
      <h2 className="text-xl font-bold mb-6 text-purple-400">Hello</h2>
      <ul className="space-y-4">
        <li className="hover:text-purple-400 cursor-pointer">Analytics</li>
        <li className="hover:text-purple-400 cursor-pointer">CRM</li>
        <li className="hover:text-purple-400 cursor-pointer">Reports</li>
        <li className="hover:text-purple-400 cursor-pointer">Settings</li>
      </ul>
    </div>
  );
}
