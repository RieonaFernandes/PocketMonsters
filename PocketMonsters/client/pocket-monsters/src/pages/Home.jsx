export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Pokémon World!
      </h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-600">
            Discover your favorite Pokémon and explore their details in our
            comprehensive Pokédex!
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-4 text-gray-600">
            <li>Browse Pokémon collection</li>
            <li>View detailed Pokémon information</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
