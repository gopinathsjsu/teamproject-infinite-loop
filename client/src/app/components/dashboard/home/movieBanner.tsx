import Link from "next/link";
import Image from 'next/image';

export default function MovieBanner() {
    const movies = [
        {
            "id": "c86f937b-ea07-495c-9047-da30a1b758e5",
            "movie_name": "Spider-Man: Home Coming",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1682705686/movies/movie-image-Spider-Man:HomeComming.png",
            "genre_name": "Action",
            "category": "Action, Adventure, Sci-Fi"
        },
        {
            "id": "eb1cbd47-ad32-4c6e-ae7e-d57dd2a36920",
            "movie_name": "The Lion King",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1682706194/movies/movie-image-TheLionKing.png",
            "genre_name": "Adventure",
            "category": "Action, Adventure, Fantasy"
        },
        {
            "id": "dec9c725-3673-4e36-afc9-065d6b8c8f8d",
            "movie_name": "JUNG_E",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683081550/movies/movie-image-JUNG_E.jpg",
            "genre_name": "Action",
            "category": "Action, Adventure, Sci-Fi"
        },
        {
            "id": "769cbd36-2b7c-4713-bf31-51dba69cdbf6",
            "movie_name": "Spider-Man: No Way Home",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683082954/movies/movie-image-Spider-Man:NoWayHome.jpg",
            "genre_name": "Action",
            "category": "Action, Adventure, Sci-Fi"
        },
        {
            "id": "f77fa2a9-b04c-41df-aa1b-d170a55ef908",
            "movie_name": "Guardians of the Galaxy Vol. 3",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683099358/movies/movie-image-GuardiansoftheGalaxyVol.3.jpg",
            "genre_name": "Adventure",
            "category": "Action, Comedy, Adventure, Sci-Fi"
        },
        {
            "id": "af4ce5a9-5524-4bbe-b4b4-e3cb82c68451",
            "movie_name": "The Super Mario Bros. Movie",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683103052/movies/movie-image-TheSuperMarioBros.Movie.jpg",
            "genre_name": "Fantasy",
            "category": "Animation, Comedy, Adventure, Fantasy"
        },
        {
            "id": "31bf35a7-16cf-4003-b72a-6c50f693b082",
            "movie_name": "The Pope's Exorcist",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683131710/movies/movie-image-ThePope%27sExorcist.jpg",
            "genre_name": "Horor",
            "category": "Horor, Thriller"
        },
        {
            "id": "2ceb60eb-2240-4666-8928-23e676043d4b",
            "movie_name": "John Wick: Chapter 4",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683134185/movies/movie-image-JohnWick:Chapter4.jpg",
            "genre_name": "Action",
            "category": "Action, Crime, Thriller"
        },
        {
            "id": "26e54af3-bf61-40b4-ad12-1c23f96adeb5",
            "movie_name": "Fast X",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683162347/movies/movie-image-FastX.jpg",
            "genre_name": "Action",
            "category": "Action, Crime"
        },
        {
            "id": "8a8bcf52-202c-43f3-ba08-c5edf50be5af",
            "movie_name": "Hypnotic",
            "image": "https://res.cloudinary.com/dare4eibk/image/upload/v1683162769/movies/movie-image-Hypnotic.jpg",
            "genre_name": "Mystery",
            "category": "Mystery, Thriller"
        }
    ]
    // const addMovie = (id, name) => {
    //     const payload = { id: id, name: name };
    //     dispatch(orderAction.addMovieId(payload));
    //     handleNavigate(`/movies/${id}`);
    // };
    return (
        <div className="bg-base-200">
            <section className="mw-global global-px pt-16">
                <div className="flex justify-between py-5">
                    <div className="font-bold text-2xl flex flex-col gap-3 lg:ml-40 md:ml-20 ml-10">
                        <p>Upcoming Movies</p>
                    </div>
                    <div className="lg:mr-40 md:mr-20 mr-10">
                        <Link href={"/movies"} className="font-bold">
                            view all
                        </Link>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="flex overflow-x-auto pb-10 hide-scroll-bar" style={{ maxWidth: '100vw' }}>
                    <div className="mw-global global-px flex gap-4 pt-1 pb-16 overflow-x-scroll overflow-y-clip no-scrollbar relative">
                        {movies.map(({ id, category, image, movie_name }, idx) => (
                            <div className={`flex-shrink-0 w-56 p-8/20 border-[0.5px] border-primary-line rounded-md flex flex-col items-center text-center gap-5`}
                                key={idx}>
                                <div className="w-36 h-56 relative">
                                    <Image
                                        src={image}
                                        alt=""
                                        fill
                                        sizes="100%"
                                        className="object-cover"
                                    ></Image>
                                </div>
                                <div className="flex flex-col gap-1 mb-3">
                                    <p className="font-bold text-lg text-primary-title text-center">
                                        {movie_name}
                                    </p>
                                    <p className="text-xs text-gray-400 text-center">{category}</p>
                                </div>
                                <button
                                    className="mt-auto btn btn-sm btn-block btn-primary text-white font-normal hover:border-primary-focus"
                                    // onClick={() => {
                                    //     addMovie(id, movie_name);
                                    // }}
                                >
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}