import HubCreationBlock from './HubCreationBlock'

export default function HubSubmitPage({
  currentUser,
  tier,
  userArcs,
  dataGlobalArcs,
  setDataGlobalArcs,
  getDataGlobalArcs,
  mainShow,
  setMainShow,
  credit,
}) {
  return (
    <div className="">
      <div className="">
        <HubCreationBlock
          currentUser={currentUser}
          tier={tier}
          userArcs={userArcs}
          dataGlobalArcs={dataGlobalArcs}
          setDataGlobalArcs={setDataGlobalArcs}
          mainShow={mainShow}
          setMainShow={setMainShow}
          credit={credit}
        />
      </div>
    </div>
  )
}
