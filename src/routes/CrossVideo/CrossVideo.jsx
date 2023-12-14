import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArchipelagoCreation from './ArchipelagoCreation';
import { Button, Spinner, Input, Textarea } from "@material-tailwind/react";
import ArchipelagoChat from './ArchipelagoChat';
import EditArchipelago from './EditArchipelago';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import Loading from '../../components/Loading';
import axios from 'axios';

import jsonData from "./arcs_and_thumbnails.json" // TODO: replace with API call
import { API_URL } from '../../constants';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';



function CrossVideo({ currentUser, collapsed, setCollapsed, tier, idToken, userArchipelagos, setUserArchipelagos, credit, setContentName, setCreditCalled }) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id



	const [windowSizeChecked, setWindowSizeChecked] = useState(false);

	const [called, setCalled] = useState(false);
	const [sourceIDsArchipelago, setSourceIDsArchipelago] = useState([]);
	const [dataArchipelago, setDataArchipelago] = useState([]);
	const [data, setData] = useState([]);
	const [archipelagoInfo, setArchipelagoInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [archipelagoDescription, setArchipelagoDescription] = useState("");
	const [archipelagoTitle, setArchipelagoTitle] = useState("");
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [subCalled, setSubCalled] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false)
	const [helmetThumbnail, setHelmetThumbnail] = useState("");
	const [isVisible, setIsVisible] = useState(false)
	const [isPublic, setIsPublic] = useState(false)
	const [authorizationError, setAuthorizationError] = useState(false)



	const isCreateArc = location.pathname.split('/')[2] === "createArc"
	const isEditArc = location.pathname.split('/')[2] === "editArc"
	const isArc = location.pathname.split('/')[1] === "arc" && location.pathname.split('/')[2] !== "editArc" && location.pathname.split('/')[2] !== "createArc"
	const isArchipelago = location.pathname.split('/')[1] === "archipelago"

	let item_thumbnail
	let item_name
	if (isArc || isEditArc) {
		const item = jsonData.find(t => t.arc_id === location.pathname.split('/')[2]);
		if (item !== undefined) {
			item_thumbnail = item.thumbnail_url
			item_name = item.name
		}

	}




	useEffect(() => {

		if (isArchipelago) {
			const newPathname = location.pathname.replace("archipelago", "arc")
			navigate(newPathname);
		}



		if (!windowSizeChecked) {
			if (window.innerWidth < 768) {
				setCollapsed(true)
			}
			setWindowSizeChecked(true)
		}


		if (dataArchipelago !== null && dataArchipelago.length > 1) {
			setErrorMessage(false)
		}
	})



	useEffect(() => {

		if ((isArc || isEditArc) && sessionStorage.getItem("arcAction") === "true") {

			sessionStorage.removeItem("arcAction")
			window.location.reload()
		}
	}, [])

	useEffect(() => {

		if ((isArc || isEditArc) && data.length === 0 && called !== true) {

			handleArcInfo()

		}
	}, [currentUser])



	const handleArcInfo = async () => {
		setAuthorizationError(false)
		sessionStorage.removeItem("arcAction")

		if ((isArc || isEditArc) && data.length === 0 && called !== true) {
			setIsLoading(true)
			let idToken
			if (localStorage.getItem("idToken") !== null) {
				idToken = localStorage.getItem("idToken")
			}
			else {
				idToken = await currentUser.getIdToken(true)
			}



			source_id = isArc ? location.pathname.split('/')[2] : location.pathname.split('/')[3]

			try {

				await axios.get(`${API_URL}/playlists/${source_id}?nof_questions=30`,
					{
						headers: {
							"accept": "application/json",
							'id-token': idToken,
						},
					}
				).then((response) => {

					setAuthorizationError(false)
					setCalled(true)
					setData(response.data)

					setIsVisible(response.data.is_visible)
					localStorage.setItem("isVisible", response.data.is_visible)
					setIsPublic(response.data.is_public)
					setArchipelagoInfo(response.data)
					if (response.data.description === "null") {
						setArchipelagoDescription("")
					}
					else {
						setArchipelagoDescription(response.data.description)
					}
					setArchipelagoTitle(response.data.name)
					setContentName(response.data.name)
					setDataArchipelago(response.data.tracks)
					let sources = response.data.tracks.map((item) => item.source_id)
					setSourceIDsArchipelago([...sources])
					setIsLoading(false)
				}
				)
			}
			catch (error) {
				setIsLoading(false)
				/* setCalled(true) */

				if (axios.isCancel(error)) {
					console.log('Request cancelled');
				}

				if (error.response.data.detail = "You are not authorized to see this playlist.") {
					setAuthorizationError(true)


				}
				else {
					console.log("arcChat error", error)
				}

				/* navigate("/404") */
			}

		}
	}

	if (isArc && sessionStorage.getItem("arcAction") === "true") {
		sessionStorage.removeItem("arcAction")
		window.location.reload()
	}


	const handleArchipelago = () => {


		// disallow creating if dataarchipelago is empty
		// disallow creating if there is a limit on the number of archipelagos
		// disallow creating if there is a limit on the number of videos to include in a archipelago
		// disallow creating if the user is not logged in
		if (dataArchipelago.length === 0) {
			setErrorMessage(true)
			return
		}
		else {
			try {
				if (isCreateArc) {
					setIsLoadingSubmit(true)
					axios.post(`${API_URL}/playlists/`, {
						"name": archipelagoTitle.length > 0 ? archipelagoTitle : "My Arc",
						"user_id": currentUser.uid,
						"description": archipelagoDescription,
						"sources": [...dataArchipelago],
					}
						, {
							headers: {
								'id-token': currentUser.accessToken,
							},
						}
					).then((response) => {

						sessionStorage.setItem("arcAction", "true")
						setTimeout(() => {

							navigate(`/arc/${response.data.uid}`)
							setIsLoadingSubmit(false)
						}, 2000);

					})
				}
				else if (isEditArc) {
					setIsLoadingSubmit(true)
					sessionStorage.setItem("arcAction", "true")
					axios.patch(`${API_URL}/playlists/${archipelagoInfo.uid}`, {
						"name": archipelagoTitle.length > 0 ? archipelagoTitle : "My Arc",
						"user_id": currentUser.uid,
						"description": archipelagoDescription,
						"sources": [...dataArchipelago],
					}
						, {
							headers: {
								'id-token': currentUser.accessToken,
							},
						}
					).then((response) => {

						sessionStorage.setItem("arcAction", "true")
						setTimeout(() => {

							navigate(`/arc/${response.data.uid}`)
							setIsLoadingSubmit(false)
						}, 2000);
					})
				}
			}
			catch (error) {
				setIsLoadingSubmit(false)
				console.log("arcChat error", error)
				if (axios.isCancel(error)) {
					console.log('Request cancelled');
				}
				else if (error.response.status === 400) {
					setErrorMessage(true)
				}
			}

		}
	}
	const handleDeleteArchipelago = () => {
		setIsLoadingDelete(true)

		axios.delete(`${API_URL}/playlists/${archipelagoInfo.uid}`,
			{
				headers: {
					'id-token': currentUser.accessToken,
				},
			}

		).then((response) => {

			const index = userArchipelagos.indexOf(archipelagoInfo)
			userArchipelagos.splice(index, 1)
			setUserArchipelagos([...userArchipelagos])
			navigate(`/`)
		})
			.catch((error) => {
				console.log(error)
				setIsLoadingDelete(false)
			})
	}

	const handleVisibility = () => {
		const targetVisibility = !isVisible
		localStorage.setItem("isVisible", isVisible)
		try {
			axios.patch(`${API_URL}/playlists/${archipelagoInfo.uid}/visibility?visibility=${targetVisibility}`, null, {
				headers: {
					'accept': 'application/json',
					'id-token': currentUser.accessToken,
				},
			}
			).then((response) => {
				localStorage.setItem("isVisible", targetVisibility)
				setIsVisible(targetVisibility)
				setIsPublic(targetVisibility)

			}
			)

		}
		catch (error) {
			console.log("arcChat error", error)
			if (axios.isCancel(error)) {
				console.log('Request cancelled');
			}
			else if (error.response.status === 400) {
				setErrorMessage(true)
			}
		}
	}



	return (
		<div className="scrolling dark:bg-darkMode dark:text-zinc-300">
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>

			<div className="flex flex-row ">
				{<div className={`hidden ${isArc ? "md:block" : "sm:block"} `}>

					<SideFeedReworked collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id} dataArchipelago={dataArchipelago} tier={tier}

					/></div>}

				<div
					className={`fixed top-0 z-50 transition origin-top-right transform ${isArc ? "md:hidden" : "sm:hidden"}  w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeedReworked collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id} dataArchipelago={dataArchipelago}
							tier={tier}
						/></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} md:px-20 pb-20 sm:pb-0 w-full sm:max-h-[100vh] ${collapsed ? 'hidden' : ' overflow-hidden'
						}}`}
				>

					{



						isCreateArc &&

						(currentUser

							?



							(
								((tier === "free" && userArchipelagos.length < 1) || (tier === "basic" && userArchipelagos.length < 3) || (tier === "premium"))


									?
									<ArchipelagoCreation userArchipelagos={userArchipelagos} tier={tier} archipelagoDescription={archipelagoDescription} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} archipelagoTitle={archipelagoTitle} setArchipelagoDescription={setArchipelagoDescription} setArchipelagoTitle={setArchipelagoTitle} sourceIDsArchipelago={sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago} errorMessage={errorMessage} setErrorMessage={setErrorMessage} credit={credit} setCreditCalled={setCreditCalled} />
									:

									isLoadingSubmit === false ?
										<div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 flex flex-col">
											<p className="font-averta-semibold">You've already have the maximum number of Arcs for your plan.</p>

											<p className="mt-4 font-averta-semibold"><Link to="/account" className="dark:text-greenColor text-green-400 underline font-averta-semibold ">Upgrade</Link> your plan to create more Arcs.</p>

										</div>

										: null

							)

							:


							<div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 pl-5">

								<div className="mb-10">
									<Link to="/submit" className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer">
										<KeyboardArrowLeftIcon fontSize="small" className="" />
										<span className="text-sm  font-averta-semibold">Go Back</span>
									</Link></div>
								<Link to="/u/login" className="dark:text-greenColor text-green-400 underline font-averta-semibold">Sign in</Link> or <Link to="/u/register" className="dark:text-greenColor text-green-400 underline font-averta-semibold"> create an account</Link> to access this page.
							</div>
						)

					}



					{(!isCreateArc && !isEditArc) ? isLoading ? <Loading /> :

						(authorizationError ?
							<div className="mx-10 mx-auto md:mx-20  mt-20 md:mt-40">
								<div className="text-xl  text-zinc-700 dark:text-zinc-300 max-w-[600px] font-averta-semibold">
									The arc you're trying to reach either doesn't exist or you don't have permission to access it. Check out arcs by Alphy <Link to="/arcs" className="dark:text-greenColor text-green-400 underline font-averta-semibold">here</Link>.
								</div>

							</div>
							:
							<ArchipelagoChat data={data} setData={setData} currentUser={currentUser}
								dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago}
								handleVisibility={handleVisibility} isVisible={isVisible} setIsVisible={setIsVisible}
								isPublic={isPublic} setIsPublic={setIsPublic} tier={tier} />)

						: null}




					{


						isEditArc &&

						(currentUser ?


							<EditArchipelago archipelagoInfo={archipelagoInfo} tier={tier} setArchipelagoInfo={setArchipelagoInfo} userArchipelagos={userArchipelagos} archipelagoDescription={archipelagoDescription} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} archipelagoTitle={archipelagoTitle} setArchipelagoDescription={setArchipelagoDescription} setArchipelagoTitle={setArchipelagoTitle} sourceIDsArchipelago={sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago} errorMessage={errorMessage} setErrorMessage={setErrorMessage} credit={credit} setCreditCalled={setCreditCalled} />

							:


							<div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 font-averta-semibold pl-5">
								<Link to="/u/login" className="dark:text-greenColor text-green-400 underline font-averta-semibold">Sign in</Link> or <Link to="/u/register" className="dark:text-greenColor text-green-400 underline font-averta-semibold"> create an account</Link> to access this page.
							</div>

						)

					}

				</div>
			</div>
			{

				(

					(

						isCreateArc &&

						((tier === "free" && userArchipelagos.length < 1) || (tier === "basic" && userArchipelagos.length < 3) || (tier === "premium"))

					)

					||

					isEditArc

				)

				&&
				<div className={`z-50 absolute bottom-0 w-full flex h-[40px] ${currentUser ? "" : "hidden"} ${!collapsed && window.innerWidth < 1000 && "hidden"} lg:bg-transparent dark:lg:bg-transparent`} >
					<div className="flex justify-end items-center flex-grow mr-10 lg:mr-40 pb-10 lg:pb-40 ">

						{isEditArc && !isLoadingSubmit && <Button size={window.innerWidth > 1000 ? "lg" : `md`} className="bg-red-400 px-5 mr-5 font-averta-semibold" onClick={() => setDeleteDialog(true)}> <DeleteIcon /> <span className="mt-1">Delete </span></Button>}
						{<Button size={window.innerWidth > 1000 ? "lg" : `md`} className={`bg-greenColor px-5 font-averta-semibold ${isLoadingSubmit && "bg-green-300 pointer-events-none min-w-[106.533px]"}`} onClick={handleArchipelago}>
							{
								isLoadingSubmit ?

									<Spinner color="white" size={window.innerWidth > 1000 ? "lg" : `md`} className="flex mx-auto" />

									:
									<div>
										<SaveIcon className="mr-2" />{isCreateArc ? "Create" : "Save"}
									</div>
							}
						</Button>}

					</div>
					{deleteDialog &&
						<Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >

							<div className="p-10 w-[240px] h-[120px] flex md:w-[360px] md:h-[180px] text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-mildDarkMode items-center text-center justify-center drop-shadow-sm flex-col">
								<p className="mb-10 font-averta-semibold">You are about to delete this arc. Would you like to continue?</p>
								<div >
									{isLoadingDelete ?

										<div>

											<Spinner color="green" size="sm" className="flex mx-auto opacity-40 mb-2" />
											<p className="text-zinc-500 dark:text-zinc-600 italic font-averta-semibold">Deleting...</p>
										</div>
										:
										<div className="flex flex-row">
											<p className="text-greenColor cursor-pointer font-averta-semibold" size="sm" onClick={() => setDeleteDialog(false)}>Cancel</p>
											<div className="border-r h-full mr-4 ml-4"></div>
											<p className="text-red-400 cursor-pointer font-averta-semibold" size="sm" onClick={handleDeleteArchipelago}>Delete</p>
										</div>
									}
								</div>
							</div>

						</Dialog>
					}
				</div>
			}
		</div>
	);
}

export default CrossVideo;
