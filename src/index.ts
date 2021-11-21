type Planet = {
  name: string
  mass: number
  distance: number
  hasRingSystem: boolean
}

// Создать массив объектов, где каждый объект - планета Солнечной системы.

const planets: Planet[] = [
  {
    name: 'Меркурий',
    mass: 0.33,
    distance: 57_900_000,
    hasRingSystem: false,
  },
  {
    name: 'Венера',
    mass: 4.87,
    distance: 108_200_000,
    hasRingSystem: false,
  },
  {
    name: 'Земля',
    mass: 5.97,
    distance: 149_600_000,
    hasRingSystem: false,
  },
  {
    name: 'Марс',
    mass: 0.642,
    distance: 227_900_000,
    hasRingSystem: false,
  },
  {
    name: 'Юпитер',
    mass: 1898,
    distance: 778_600_000,
    hasRingSystem: true,
  },
  {
    name: 'Сатурн',
    mass: 568,
    distance: 1_433_500_000,
    hasRingSystem: true,
  },
  {
    name: 'Уран',
    mass: 86.8,
    distance: 2_872_500_000,
    hasRingSystem: true,
  },
  {
    name: 'Нептун',
    mass: 102,
    distance: 4_495_100_000,
    hasRingSystem: true,
  },
  {
    name: 'Плутон',
    mass: 0.0146,
    distance: 5_906_400_000,
    hasRingSystem: false,
  },
]

const distanceFromSunToEath = 149_600_000

const makeTitlePrinter = (): ((title: string) => void) => {
  let count = 1

  return (title) => {
    console.log('\n%d. %s', count, title)
    count++
  }
}

const printTitle = makeTitlePrinter()

// Создать функцию которая выводит список названий планет в порядке удаленности от Солнца

const printPlanetsByDistance = (planets: Planet[]) => {
  printTitle('Названия планет в порядке удаленности от Солнца:')

  const sortedPlanets = planets.sort((a, b) => a.distance - b.distance)

  for (const planet of sortedPlanets) {
    console.log('\n\t%s — %d км', planet.name, planet.distance)
  }
}

printPlanetsByDistance(planets)

// Создать функцию которая выводит список планет у которых отсутствуют кольца

const printPlanetsWithoutRings = (planets: Planet[]) => {
  printTitle('Планеты у которых отсутствуют кольца:')

  const filtredPlanets = planets.filter((it) => !it.hasRingSystem)

  for (const planet of filtredPlanets) {
    console.log('\n\t%s', planet.name)
  }
}

printPlanetsWithoutRings(planets)

// Создать функцию которая выводит названия планет с наибольшей и наименьшей массой

const printPlanetWithMass = (planet: Planet) => {
  console.log('\n\t%s — %d * 10^24 кг', planet.name, planet.mass)
}

const printPlanetsMaxMinMass = (planets: Planet[]) => {
  const sortedPlanets = planets.sort((a, b) => a.mass - b.mass)

  printTitle('Название планеты с наименьшей массой:')
  printPlanetWithMass(sortedPlanets.shift()!)

  printTitle('Название планеты с наибольшей массой:')
  printPlanetWithMass(sortedPlanets.pop()!)
}

printPlanetsMaxMinMass(planets)

// Создать функцию которая находит минимальное и максимальное расстояния
// между двумя последовательными планетами

const printDistanceBetweenTwoPlanets = ({
  planets,
  distance,
}: {
  planets: Planet[]
  distance: number
}) => {
  console.log(
    `\n\t%s <--> %s — %d км`,
    planets[0].name,
    planets[1].name,
    distance,
  )
}

const printClosestAndFarestPlanets = (planets: Planet[]) => {
  const distances = planets.slice(0, -1).map((it, i) => {
    const nextPlanet = planets[i + 1]

    return {
      distance: Math.abs(it.distance - nextPlanet.distance),
      planets: [it, nextPlanet],
    }
  })
  const sortedDistances = distances.sort((a, b) => a.distance - b.distance)

  printTitle('Минимальное расстояние между двумя последовательными планетами:')
  printDistanceBetweenTwoPlanets(sortedDistances.shift()!)

  printTitle('Максимальное расстояние между двумя последовательными планетами:')
  printDistanceBetweenTwoPlanets(sortedDistances.pop()!)
}

printClosestAndFarestPlanets(planets)

// Создать функцию которая выводит название самой удаленной планеты до которой
// способен долететь космонавт на космическом корабле с запасом хода
// (40 млн км., 150 млн км., 1600 млн км.) при условии отправления с планеты Земля.
// Если космонавт не в состоянии долететь ни до одной планеты,
// то необходимо вывести - “невозможно долететь до ближайшей планеты“

const printPlanetsYouCanReachWithGivenRange = (
  planets: Planet[],
  rangesInMillionKms: number[],
) => {
  printTitle(
    'Название самой удаленной планеты до которой способен долететь космонавт на космическом корабле с запасом хода',
  )

  const sortedByDistanceFromEarthPlanets = planets
    .filter((it) => it.distance !== distanceFromSunToEath)
    .map((it) => ({
      ...it,
      distance: Math.abs(it.distance - distanceFromSunToEath),
    }))
    .sort((a, b) => a.distance - b.distance)

  for (const range of rangesInMillionKms) {
    const farestPlanetYouCanReach = sortedByDistanceFromEarthPlanets
      .filter((it) => it.distance <= range * 1_000_000)
      .pop()?.name

    console.log(
      `\n\t%d млн км.: %s`,
      range,
      farestPlanetYouCanReach ?? 'невозможно долететь до ближайшей планеты',
    )
  }
}

printPlanetsYouCanReachWithGivenRange(planets, [40, 150, 1600])
