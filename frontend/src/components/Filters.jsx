export default function Filters({ setFilters }) {
  return (
    <div className="flex gap-3">
      <select onChange={(e) => setFilters(f => ({...f, topic: e.target.value}))}>
        <option value="">Topic</option>
        <option value="oil">Oil</option>
        <option value="gas">Gas</option>
      </select>

      <select onChange={(e) => setFilters(f => ({...f, region: e.target.value}))}>
        <option value="">Region</option>
        <option value="World">World</option>
        <option value="Northern America">North America</option>
      </select>
    </div>
  );
}
