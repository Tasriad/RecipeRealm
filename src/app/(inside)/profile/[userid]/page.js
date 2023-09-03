'use client'
import RecipeCard from "@/components/RecipeCard";
import { images } from "@/constants";
import Image from "next/image";
import ProfileCard from "@/components/MiniProfileCard";
import useSWR from "swr"
import { useRouter } from "next/navigation";
import { Skeleton } from "@mui/material";
import { Stack } from "@mui/material";

const fetcher = (path) => fetch(`${path}`).then(res => res.json())

export default function Home({params}) {
  const { data, error } = useSWR(`/api/user_details?id=${params.userid}`, fetcher)
  const router = useRouter()
  if(data)
  {
    console.log(data)
  }
  const handleClick = () => {
    console.log("clicked");
    router.push('/') //need to change this to edit
  }
  return (
    <div >
      {
  data ? (
    <>
      <div className="relative flex bg-white flex-col justify-center w-full h-full flex-wrap ">
        <div className="rounded-3xl relative ml-4 flex justify-center flex-row w-full shadow-sky-100 hover:shadow-lg pb-2 ">
          <div className=" rounded-3xl hover:bg-blue-300">
            <Image src={images.avatar} width={150} height={150} alt="logo" />
          </div>
          <div className="w-2/4 ml-5 flex flex-col items-start">
            <h1 className="text-4xl text-right font-bold
                                fond-sans text-zinc-700
                                mt-3 ">{data?.details[0]?.FIRST_NAME + ' ' + data?.details[0]?.LAST_NAME}</h1>
            <h3 className="text-2xl italic text-right mb-3 fond-sans text-zinc-600">{data?.details[0]?.EMAIL_ADDRESS}</h3>
            <h6 className="text-xl text-right fond-sans text-zinc-500">Joined: {data?.details[0]?.REGISTRATION_DATE}</h6>
          </div>
          <div className="flex justify-center flex-col max-w-7xl">
            <button onClick={handleClick} class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Follow 
            </button>
          </div>
        </div>
        <div className=" rounded-2xl m-3 relative flex flex-wrap justify-around flex-row w-full h-full min-w-fit shadow-sky-100 hover:shadow-xl pb-2">
          <div className="relative items-center flex flex-col m-5" style={{ maxHeight: '425px' }}>
            <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 rounded-xl shadow-xl">
              Created Recipes
            </h1>
            <ul className="relative flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >
              {data?.created_recipes?.map((recipe, index) => (
                <li>
                  <RecipeCard title={recipe.TITLE?recipe.TITLE:'No recipe Created'} description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} publisher={data?.details[0]?.FIRST_NAME + ' ' + data?.details[0]?.LAST_NAME} />
                </li>
              ))}
            </ul>
          </div>
          <div className="relative items-center flex flex-col m-5" style={{ maxHeight: '425px' }}>
            <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 shadow-xl">
              Favorite Recipes
            </h1>
            <ul className="relative flex flex-col p-2  overflow-y-auto max-h-fit hover:shadow-xl" >
              {data?.favorites?.map((recipe, index) => (
                <li>
                  <RecipeCard title={recipe.RECIPE_TITLE ? recipe.RECIPE_TITLE : 'No Favorites'} description={"Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"} publisher={recipe.PUBLISHER_NAME} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative items-right flex flex-col h-full w-full m-4 rounded-2xl  shadow-sky-100 hover:shadow-xl p-3 mb-10" style={{ maxHeight: '425px' }}>
        <h1 className="text-center font-extrabold text-2xl m-3 text-amber-800 shadow-xl">
          Followers
        </h1>
        <ul className="relative flex flex-row max-w-6xl max-h-fit overflow-x-auto ">
        {data?.following?.map((user, index) => (
                <li>
                  <ProfileCard name={user.NAME} email={user.EMAIL_ADDRESS} userID={user.FOLLOWING_ID} />
                </li>
              ))}
        </ul>
      </div>
    </>
  ) : (
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
      <Skeleton variant="rounded" animation="wave" width={210} height={60} />
    </Stack>
  )
}
    </div>

  );
}




