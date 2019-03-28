import { put, select } from 'redux-saga/effects'

import { CREATE_STORY, UPDATE_STORY, PUBLISH_STORY, SHARE } from '../constants/api'
import { post, patch } from '../utils/api'
import { callWith401Handle } from './api'
import { successfulSave, successfulCreation } from "../actions/editor";
import { toStory } from '../actions/navigation'

export function* storyUpdatePayload() {
  const { editor: { title, content, tags } } = yield select()
  return {
    title,
    content: JSON.stringify(content.toJSON()),
    tags
  }
}

export function* save() {
  const { editor: { storyId } } = yield select()
  const payload = yield storyUpdatePayload()
  if (!storyId) {
    
    const { storyId } = yield callWith401Handle(post, CREATE_STORY, payload)
    yield put(successfulCreation(storyId))
  } else {
    yield callWith401Handle(patch, UPDATE_STORY(storyId), payload)
    yield put(successfulSave())
  }
}

export function* publish() {
  const { editor: { changesSaved, storyId } } = yield select()
  if (!changesSaved) {
    yield save()
  }
  yield callWith401Handle(post, PUBLISH_STORY(storyId))
  yield put(toStory(storyId))
}

export function* share() {
  const { editor: { userToShareName, storyId } } = yield select()
  try {
    yield callWith401Handle(post, SHARE(storyId), { username: userToShareName })
  } catch(err) {
    // to: for now simply print error in console
    console.info('fail to share: ', err)
  }
}