import { BookOpen, Disc3, Film, Gamepad2, Star, Tv } from "lucide-react";
import { mediaByYear } from "../data/media";

const mediaTypes = [
  { key: "movies", label: "영화", Icon: Film },
  { key: "dramas", label: "드라마", Icon: Tv },
  { key: "books", label: "책", Icon: BookOpen },
  { key: "albums", label: "앨범", Icon: Disc3 },
  { key: "games", label: "게임", Icon: Gamepad2 },
];

function YearSummary({ record }) {
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.82rem] text-fg-dim">
      {mediaTypes.map(({ key, label, Icon }) => (
        <span key={key} className="flex items-center gap-1.5">
          <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
          {label} {record[key].length}
        </span>
      ))}
    </div>
  );
}

function interleaveMedia(movies, dramas, books, albums, games) {
  const media = [];
  const length = Math.max(
    movies.length,
    dramas.length,
    books.length,
    albums.length,
    games.length,
  );

  for (let index = 0; index < length; index += 1) {
    if (movies[index]) media.push({ ...movies[index], type: "movie" });
    if (dramas[index]) media.push({ ...dramas[index], type: "drama" });
    if (books[index]) media.push({ ...books[index], type: "book" });
    if (albums[index]) media.push({ ...albums[index], type: "album" });
    if (games[index]) media.push({ ...games[index], type: "game" });
  }

  return media;
}

const itemTypes = {
  movie: { label: "영화", Icon: Film },
  drama: { label: "드라마", Icon: Tv },
  book: { label: "책", Icon: BookOpen },
  album: { label: "앨범", Icon: Disc3 },
  game: { label: "게임", Icon: Gamepad2 },
};

function MixedMediaList({ movies, dramas, books, albums, games }) {
  const items = interleaveMedia(movies, dramas, books, albums, games);

  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-5 max-sm:grid-cols-1">
      {items.map(({ title, rating, season, type }) => {
          const { label, Icon } = itemTypes[type];

          return (
            <li
              key={`${type}-${title}-${season ?? ""}`}
              className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-2.5"
            >
              <Icon
                size={15}
                strokeWidth={1.6}
                className="text-fg-dim"
                aria-label={label}
              />
              <div className="min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-[0.95rem] leading-tight">
                <span className="font-semibold text-fg">{title}</span>
              </div>
              {rating !== null && (
                <span className="flex items-center gap-1 text-[0.78rem] text-fg-dim tabular-nums">
                  <Star size={11} strokeWidth={1.6} fill="currentColor" aria-label="별점" />
                  {rating.toFixed(1)}
                </span>
              )}
              {rating === null && (
                <span className="text-[0.78rem] text-fg-dim/70">
                  -
                </span>
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default function Watching() {
  return (
    <>
      <div className="mb-12">
        <h1 className="font-serif text-[1.75rem] font-bold mb-3">매체</h1>
        <p className="max-w-[55ch] text-fg-dim">
          읽고 본 것들을 잊지 않기 위해 기록합니다.
        </p>
      </div>

      <div className="space-y-16">
        {mediaByYear.map((record) => {
          const total = mediaTypes.reduce(
            (count, { key }) => count + record[key].length,
            0,
          );

          return (
            <section key={record.year}>
              <h2 className="font-serif text-[1.25rem] font-bold">
                {record.year}
              </h2>
              <YearSummary record={record} />

              {total > 0 ? (
                <div className="mt-8">
                  <MixedMediaList
                    movies={record.movies}
                    dramas={record.dramas}
                    books={record.books}
                    albums={record.albums}
                    games={record.games}
                  />
                </div>
              ) : (
                <p className="mt-8 text-[0.9rem] text-fg-dim">
                  아직 기록한 작품이 없습니다.
                </p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
