import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState(10);
  const [sorting, setSorting] = useState("");

  useEffect(() => {
    const fetching = async () => {
      const request = await fetch("http://localhost:3000/pokemon");
      const data = await request.json();

      setData(data);
    };
    fetching();
  }, []);

  const filtered = data.filter((value) => {
    return value.name.toLowerCase().includes(query.toLowerCase());
  });

  const sort = filtered.sort((a, b) => {
    switch (sorting) {
      case "heightPlus":
        return a.height < b.height ? 0 : -1;
        break;
      case "heightMinus":
        return a.height > b.height ? 0 : -1;
        break;
      case "za":
        return a.name.localeCompare() + b.name.localeCompare();
        break;
      default:
        return 0;
        break;
    }
  });

  return (
    <main className="min-h-screen bg-gray-200 py-20">
      <div>
        <h1 className="text-[1rem] text-center font-semibold mb-10">Pokedex</h1>
        <header className="grid grid-cols-3 gap-10 justify-center w-full items-center max-w-3xl m-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="bg-white rounded-[8px] p-3 accent-red-700"
            onChange={(value) => setQuery(value.currentTarget.value)}
          />
          <div className="flex flex-row items-center gap-2">
            <input
              type="range"
              className="accent-red-700 w-full"
              onChange={(value) => setRange(value.currentTarget.valueAsNumber)}
              step={1}
              max={20}
              min={1}
            />
            <span>{range}</span>
          </div>
          <select
            className="bg-white rounded-[8px] p-3 accent-red-700"
            onChange={(value) => {
              setSorting(value.currentTarget.value);
            }}
            defaultValue={"default"}
          >
            <option disabled value={"default"}>
              --Sort--
            </option>
            <option value="az">Name A{"->"}Z</option>
            <option value="za">Name Z{"<-"}A</option>
            <option value="heightPlus">Height /\</option>
            <option value="heightMinus">Height \/</option>
          </select>
        </header>
        <section className="grid grid-cols-4 gap-10 p-32">
          {sort.slice(0, range).map((pokemon, index) => {
            return (
              <div
                style={{
                  boxShadow: "0 0px 8px rgba(0,0,0,0.06)",
                }}
                className="bg-white rounded-[8px] py-5 transition-transform hover:-translate-y-[5px]"
                key={index}
              >
                <div className="text-center text-[1.2rem] mb-4 font-semibold">
                  {pokemon.name}
                </div>
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-[150px] m-auto"
                />
                <p className="text-[0.9rem] font-light text-center mt-3">
                  Type : {pokemon.type} <br /> Height : {pokemon.height}
                </p>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
