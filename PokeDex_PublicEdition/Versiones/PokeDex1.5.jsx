import { useFetch } from "../Hooks/useFetch"
import { Loader } from './Loader';
import { useState, useCallback, useEffect } from "react";
import { usePokemonTypeColor } from '../Hooks/CSSHooks/useTypePokColor';
import { BackGroundeffect1 } from "../Hooks/CSSHooks/useBg1";
import  Icono from '../assets/Images/close-svgrepo-com.svg';
import  sadface from '../assets/Images/sad-face-in-rounded-square-svgrepo-com.svg';
import { BgStyle1 } from "../Hooks/CSSHooks/useBgStyles";
import 'animate.css';
import "../Hooks/CSSHooks/HookCss1.css";

export const PokeDex = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSearch, setCurrentPageSearch] = useState(1);
    const itemsPerPage = 9;
    const maxPages = 9;
    const maxPagesVisible = 9;
    const [pokemon, setPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const offset = (currentPage - 1) * itemsPerPage;


    const fetchPokemon = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
            const data = await response.json();
            const detailedPokemon = await Promise.all(
                data.results.map(async (index) => {
                    const res = await fetch(index.url);
                    const pokemonData = await res.json();
                    return {
                        name: pokemonData.name,
                        id: pokemonData.id,
                        Image: pokemonData.sprites.front_default,
                        Image2: pokemonData.sprites.other['official-artwork'].front_default,
                        Altura: pokemonData.height, // Información adicional
                        Peso: pokemonData.weight, // Información adicional
                        elemento: pokemonData.types.map((typeInfo) => (
                        typeInfo.type.name
                        ),)
                    };
                })
            );
            setPokemon(detailedPokemon);
        } catch (error) {
            setHasError(true);
            console.error('Error fetching Pokémon:', error);
        } finally {
            setIsLoading(false);
        }
    }, [offset, itemsPerPage]);


    const searchPokemon = async () => {
        if (searchTerm === '') {
            setSearchResult(null);
            fetchPokemon();
            return;
        }
        setIsLoading(true);
        setHasError(false);
    
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`);
            const data = await response.json();
            
            // Filtrar resultados según el término de búsqueda
            const matchedPokemon = data.results.filter((poke) =>
                poke.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            const detailedResults = await Promise.all(
                matchedPokemon.map(async (poke) => {
                    const res = await fetch(poke.url);
                    const pokemonData = await res.json();
                    const {name, id, sprites = {front_default , 'official-artwork': {front_default}}, height, weight, types } = pokemonData;
                    return {
                        name: name, id: id, Altura: height, Peso: weight,
                        image: sprites.front_default, Image2: sprites['official-artwork'].front_default,
                        elemento: types.map((typeInfo) => typeInfo.type.name)
                    };
                })
            );
    
            setSearchResult(detailedResults);
        } catch (error) {
            setHasError(true);
            console.error('Error searching Pokémon:', error);
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        fetchPokemon();
    }, [fetchPokemon]);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value === '') {
            setSearchResult(null);
            fetchPokemon();
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const canGoNext = pokemon.length === itemsPerPage;
    const totalPages = Math.ceil(1118 / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i);
    }


    const getPageRange = () => {
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesVisible - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const handlePageChangeSearch = (page) => {
        setCurrentPageSearch(page);
    };


    const canGoNextSearch = pokemon.length === itemsPerPage;
    const totalPagesSearch = Math.ceil(1118 / itemsPerPage);
    const pageNumbersSearch = [];
    for (let i = 1; i <= maxPages; i++) {
        pageNumbersSearch.push(i);
    }


    const getPageRangeSearch = () => {
        const startPageSearch = Math.max(1, currentPageSearch - Math.floor(maxPagesVisible / 2));
        const endPageSearch = Math.min(totalPagesSearch, startPageSearch + maxPagesVisible - 1);
        return Array.from({ length: endPageSearch - startPageSearch + 1 }, (_, i) => startPageSearch + i);
    };


    return (
        <>
            <nav className="fixed left-0 w-full bg-gradient-to-r from-gray-950 to-red-900 p-3 z-10 top-0">
                    <div className="flex justify-between">
                        <div className="justify-normal">
                        <div className="relative text-white font-extrabold text-4xl">
                            <span className="absolute inset-0 text-red-600 translate-x-1 translate-y-1">
                                PokeDex 1.5
                            </span>
                            <span className="relative">PokeDex 1.5</span>
                            </div>
                        </div>
                        <div className="justify-end">
                            <input
                            type="text"
                            placeholder="Buscar Pokémon"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="p-2 rounded-lg mr-2"
                        />
                        <button onClick={searchPokemon} className="bg-gradient-to-r from-red-400 to-red-500 text-white font-semibold p-2 rounded-lg
                        transition-colors duration-500 hover:bg-gradient-to-r hover:from-red-200 hover:to-red-300 hover:text-black">Buscar</button>
                        </div>
                    </div>
                </nav>
            <BackGroundeffect1/>
            {isLoading ? (
            <Loader />
            ) : hasError ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-gradient-to-r from-red-400 to-red-600 text-black p-4 rounded-lg text-4xl font-bold text-center justify-center flex">
                    <img src={sadface} alt="Error" className="w-16 h-16 m-4" />    
                    <h1 className="text-black p-4 text-4xl font-bold ">
                    No se encontro el pokemon
                    </h1>
                    </div>
                </div>
            ) : (
                <>
                {searchResult && searchResult.length > 0 ?  (
                <>
                <section className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-5rem)] pt-16 overflow-y-auto" style={{
                scrollbarWidth: "none",
                }}>
                {searchResult.slice((currentPageSearch - 1) * itemsPerPage, currentPageSearch * itemsPerPage).map((pokemon) => (
                <div
                    key={pokemon.id}
                    onClick={() => setSelectedPokemon(pokemon)}
                    className={`bg-gradient-to-bl from-red-200 to-red-400 bg-fixed bg-cover rounded-lg shadow-lg p-1
                        opacity-80 transition-opacity duration-300 hover:opacity-100
                        animate__animated animate__zoomIn cursor-pointer max-w-4xl m-3 h-auto items-center`}
                >
                    <img src={pokemon.Image} className="h-20 w-18 mx-auto animate__animated animate__flipInX animate__slow" alt={pokemon.name} />
                    <p className="capitalize text-center text-lg font-bold">{pokemon.name}</p>
                    <div className="flex justify-between w-full">
                        <p className={`capitalize flex-1 p-1 rounded-lg text-center m-1 font-semibold`}
                            style={{
                                backgroundColor: `${usePokemonTypeColor(pokemon.elemento[0])[0]}`,
                                color: `${usePokemonTypeColor(pokemon.elemento[0])[1]}`,
                                textShadow: `${usePokemonTypeColor(pokemon.elemento[0])[2]}`
                            }}>{pokemon.elemento[0]}</p>
                        {pokemon.elemento[1] && (
                            <p className={`capitalize flex-1 p-1 rounded-lg text-center m-1 font-semibold`}
                                style={{
                                    backgroundColor: `${usePokemonTypeColor(pokemon.elemento[1])[0]}`,
                                    color: `${usePokemonTypeColor(pokemon.elemento[1])[1]}`,
                                    textShadow: `${usePokemonTypeColor(pokemon.elemento[1])[2]}`
                                }}>{pokemon.elemento[1]}</p>
                        )}
                    </div>
                </div>
            ))}
            </section>
            <footer className="flex justify-center fixed bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={() => handlePageChangeSearch(currentPageSearch - 1)}
                    disabled={currentPageSearch === 1}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                >
                    Anterior
                </button>
                {getPageRangeSearch().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChangeSearch(page)}
                        className={`${
                            page === currentPageSearch ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
                        } h-10 w-10 text-center font-bold rounded-full shadow-lg m-1`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChangeSearch(currentPageSearch + 1)}
                    disabled={!canGoNextSearch}
                    className="bg-gradient-to-l from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                >
                    Siguiente
                </button>
            </footer>
            </>
            ) : (
            <>
            <section className="grid grid-cols-3 grid-rows-3 h-[calc(100vh-5rem)] pt-16 overflow-y-auto" style={{
                scrollbarWidth: "none",
            }}>
                     {pokemon.map(index => {
                        const colorClass = usePokemonTypeColor(index.elemento[0]);
                        const colorClass2 = usePokemonTypeColor(index.elemento[1]);
                        return (
                        <div
                        key={index.id}
                        onClick={() => setSelectedPokemon(index)}
                        className={`h-auto bg-gradient-to-bl from-red-200 to-red-400 bg-fixed bg-cover rounded-lg shadow-lg p-1
                        opacity-80 transition-opacity duration-300 hover:opacity-100
                        animate__animated animate__zoomIn cursor-pointer max-w-4xl m-3 items-center`}
                        >
                        <img src={index.Image} className="h-20 w-18 mx-auto animate__animated animate__flipInX animate__slow" alt={index.name} />
                        <p className="capitalize text-center text-lg font-bold">{index.name}</p>
                        <div className="flex justify-between w-full">
                        <p  className={`capitalize flex-1 p-1 rounded-lg text-center m-1 font-semibold`}
                            style={{ backgroundColor: colorClass[0], 
                            color: colorClass[1],
                            textShadow: colorClass[2]
                            }}>{index.elemento[0]}</p>
                        {index.elemento[1] && (
                        <p  className={`capitalize flex-1 p-1 rounded-lg text-center m-1 font-semibold`}
                            style={{ backgroundColor: colorClass2[0],
                            color: colorClass2[1],
                            textShadow: colorClass2[2]
                             }}>{index.elemento[1]}</p>
                        )}
                        </div>                   
                        </div>
                    );
                    })}
                </section>
                <footer className="flex justify-center fixed bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                >
                    Anterior
                </button>
                {getPageRange().map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${
                            page === currentPage ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'
                        } h-10 w-10 text-center font-bold rounded-full shadow-lg m-1`}
                    >
                        {page}
                    </button>
                ))}
                    <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!canGoNext}
                    className="bg-gradient-to-l from-red-500 to-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-800 m-1"
                    >
                    Siguiente
                    </button>
                </footer>
                </>
            )}
            </>
            )}
            
            {selectedPokemon && (      
                <BgStyle1
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                    Icono={Icono}
                    usePokemonTypeColor={usePokemonTypeColor}
                />
             )}
        </>
    );
};
