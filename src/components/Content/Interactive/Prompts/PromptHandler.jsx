
import { CharacterPrompts } from './PromptBank.jsx'

function ArrayToQueryStrings(arrayOfObjects) {
  const queryStringsArray = arrayOfObjects.map(object => {
    return `${object.title} \n\n ${object.summary} \n\n `
  })

  return queryStringsArray.join('\n')
}

function introPromptHandler(
  content,
  character,
  content_type,
  source_type,
  source_title,
  creator_name
) {
  if (Array.isArray(content)) {
    content = ArrayToQueryStrings(content)
  }

  const characterPrompt = CharacterPrompts.find(
    prompt => prompt.name === character
  )

  let source_platform = 'X Space'
  if (source_type === 'yt') {
    source_platform = 'YouTube'
  }
  if (source_type === 'sp') {
    source_platform = 'X Space'
  }
  if (source_type === 'x') {
    source_platform = 'Twitter'
  }
  if (source_type === 'tw') {
    source_platform = 'Twitch'
  }

  const introPrompt = `"""${content}"""

    \n\nAbove is the ${content_type} of a ${source_platform} conversation titled ${source_title} from ${creator_name}. I will give you two type of instructions. HOW_TO_BEHAVE and WHAT_TO_CREATE.\n\n Below is your HOW_TO_BEHAVE instructions: \n\n ${characterPrompt.prompt}`

  return introPrompt
}

function advancedSettingsPromptHandler(settings) {
  const advancedSettingsPrompt = `
    On a scale of 1-10, where 10 means verbose and 1 means straight to the point, your verbosity level should be set to ${settings.verbosity_level}.
    On a scale of 1-10, where 10 means detailed and 1 means high-level, your detail level should be set to ${settings.detail_level}.
    `
  return advancedSettingsPrompt
}

export function promptGenerator(settings, content_details) {
  const introPrompt = introPromptHandler(
    content_details.content,
    settings.character,
    content_details.content_type,
    content_details.source_type,
    content_details.source_title,
    content_details.creator_name
  )
  const advancedSettingsPrompt = advancedSettingsPromptHandler(settings)

  const finalPrompt = '\n\n' + introPrompt + '\n\n' + advancedSettingsPrompt
  return finalPrompt
}
