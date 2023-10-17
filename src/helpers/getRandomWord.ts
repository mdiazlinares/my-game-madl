let words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'PAPAYA',
    'VEHICULO',
    'ANIMAL',
    'VETERINARIO',
    'CELULAR',
    'TELEFONO',
];

export function getRaandomWord(){
    const randomIndex = Math.floor (Math.random() * words.length);
    return words[randomIndex];
}