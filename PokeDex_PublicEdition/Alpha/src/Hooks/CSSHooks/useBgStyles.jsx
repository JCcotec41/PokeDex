
import "./HookCss1.css";
export const BgStyle1 = ({ selectedPokemon, setSelectedPokemon, Icono, usePokemonTypeColor }) => {
    return(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-20">
        <div className="animate__animated animate__backInDown ">  
        <div className={`relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray- p-[7px] transition-all duration-300 ease-in-out`}>
        <div className="GCbg"></div>
        <div
           className="bg-fixed bg-cover p-6 rounded-lg shadow-lg relative max-w-sm w-full bgchanger"
           style={{
           background: `linear-gradient(-180deg, ${usePokemonTypeColor(selectedPokemon.elemento[0])[0]}, #eeeeee)`,
           backgroundSize: '400% 400%',
           animation: 'animate2 4s infinite alternate',
          }}
       >
         <h2 className="capitalize text-2xl font-bold mb-2 text-center">
           {selectedPokemon.name}
         </h2>
         <img src={selectedPokemon.Image2} alt={selectedPokemon.name} className="mx-auto mb-4" />
         <div className="capitalize text-xl grid grid-cols-2 row-auto flex-1 text-center">
           <p><strong>Altura:</strong> {selectedPokemon.Altura} <b>dm</b></p>
           <p><strong>Peso:</strong> {selectedPokemon.Peso} <b>Hg</b></p>
         </div>
         <button onClick={() => setSelectedPokemon(null)}>
           <img src={Icono} alt="Cerrar" width="40" height="40" className="absolute top-2 right-2" />
         </button>
         </div>
        </div>
       </div>
     </div>
    )
}

export const BgStyle2 = () => {
    return(
        <div></div>
    );
}