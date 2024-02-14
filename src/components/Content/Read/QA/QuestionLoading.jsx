import TypeIt from 'typeit-react'

export default function QuestionLoading() {
  return (
    <div className="loading mt-5 mb-10 flex justify-center items-center">
      {/* <ReactLoading type="balls" color="#a1a1aa" width={50}/> */}
      <TypeIt
        className="mb-3 text-zinc-400 dark:text-zinc-400"
        getBeforeInit={instance => {
          instance
            .type('Going through the recording to answer your question...')
            .pause(1200)
            .delete(100)
            .pause(200)
            .type('Gathering up the relevant sources...')
            .pause(1200)
            .delete(100)
            .pause(500)
            .type(
              'Creating a network of information to find the best paperclips in the world...'
            )
            .pause(800)
            .delete(40)
            .pause(700)
            .type('help you get the answer as quickly as possible!')
            .pause(600)

          // Remember to return it!
          return instance
        }}
        options={{
          loop: true,
          html: true,
          speed: 10,
          cursorChar: '',
        }}
      />
    </div>
  )
}
