import * as movieDao from '../dao/movie-dao'

export const findAllByYear = (year: number) => movieDao.findAllByYear(year)

export const findByYearAndTitle = (year: number, title: string) =>
  movieDao.findByYearAndTitle(year, title)

export const update = (movie: any) => movieDao.update(movie)
