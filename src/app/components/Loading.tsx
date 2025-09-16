export function Loading() {
    return <div className="flex justify-center items-center h-100">
        <div className="m-2 max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <h3 className="text-l text-center font-bold tracking-tight text-gray-900">Connecting to Pokémon Center...</h3>
            <img className="pokeball m-auto mt-4" src="/pokeball.png" alt="Loading..." />
        </div>
    </div>;

}