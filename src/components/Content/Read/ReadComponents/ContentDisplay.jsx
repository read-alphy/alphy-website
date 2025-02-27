import { Tab, Tabs } from 'react-bootstrap'
import KeyTakeaways from './content/KeyTakeaways'
import Summary from './content/Summary'
import Transcript from './content/Transcript'

const ContentDisplay = ({
  activeTab,
  data,
  summary,
  summaryArray,
  isLoading,
  transcript,
  handleClickTimestamp,
  working,
  convertTimeToSeconds,
  handleDownload,
  downloading,
  tier,
  basicDataLoaded,
  themePopover
}) => {
  
  return (
    <Tabs>
      <Tab eventKey="transcript" title="">
        {activeTab === 'tab3' && (
          <KeyTakeaways
            key_takeaways={summary.key_takeaways}
          />
        )}

        {activeTab === 'tab1' && (
          <Summary
            isLoading={isLoading}
            summaryArray={summaryArray}
            summary={summary}
            working={working}
            handleClickTimestamp={handleClickTimestamp}
            convertTimeToSeconds={convertTimeToSeconds}
          />
        )}

        {activeTab === 'tab2' && (
          <Transcript
            isLoading={isLoading}
            transcript={transcript}
            data={data}
            handleClickTimestamp={handleClickTimestamp}
            handleDownload={handleDownload}
            downloading={downloading}
            tier={tier}
            basicDataLoaded={basicDataLoaded}
            themePopover={themePopover}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default ContentDisplay;