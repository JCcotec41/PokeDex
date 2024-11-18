export const usePokemonTypeColor = (type) => {
    switch (type) {
        case "fire":
            return [
                "#e67e22",
                "#000000"
            ];
        case "water":
            return [
                "#6390F0",
                "#000000"
            ];
        case "grass":
            return [
                "#7AC74C",
                "#000000"
            ];
        case "electric":
            return [
                "#F7D02C",
                "#000000"
            ];
        case "ice":
            return [
                "#96D9D6",
                "#000000"
            ];
        case "fighting":
            return [
                "#C22E28",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "poison":
            return [
                "#A33EA1",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "ground":
            return [
                "#E2BF65",
                "#000000"
            ];
        case "flying":
            return [
                "#A98FF3",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "psychic":
            return [
                "#F95587",
                "#000000"
            ];
        case "bug":
            return [
                "#A6B91A",
                "#000000"
            ];
        case "rock":
            return [
                "#B6A136",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "ghost":
            return [
                "#735797",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "dragon":
            return [
                "#6F35FC",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "dark":
            return [
                "#705746",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "steel":
            return [
                "#B7B7CE",
                "#ffffff",
                "#000000 0px 4px 9px"
            ];
        case "fairy":
            return [
                "#D685AD",
                "#000000"
            ];
        case "normal":
            return [
                "#A8A77A",
                "#000000"
            ];
        default:
            return "gray-500 text-white"; // Color por defecto
    }
}; 

/*

Dragón (Dragon)
Color: #6F35FC
Tailwind CSS: bg-[#6F35FC]
Siniestro (Dark)
Color: #705746
Tailwind CSS: bg-[#705746]
Acero (Steel)
Color: #B7B7CE
Tailwind CSS: bg-[#B7B7CE]
Hada (Fairy)
Color: #D685AD
Tailwind CSS: bg-[#D685AD]
 */