import { IStoreState } from '../types';
import { connect, Dispatch } from 'react-redux';
import { Action } from 'redux';
import {
	default as NoteViewerComponent,
	INoteViewerComponentProps
} from '../components/note-viewer/NoteViewerComponent';
import { getNotepadObjectByRef } from '../util';
import { INote } from '../types/NotepadTypes';
import { actions } from '../actions';

let noteRef: string = '';

export function mapStateToProps({ notepads, currentNote, meta }: IStoreState) {
	noteRef = currentNote.ref;

	let note;
	if (currentNote.ref.length !== 0) {
		getNotepadObjectByRef(notepads.notepad!.item!, currentNote.ref, obj => note = <INote> obj);
	}

	return {
		isFullscreen: meta.isFullScreen,
		note,
		noteAssets: currentNote.assetUrls,
		elementEditing: currentNote.elementEditing
	};
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<INoteViewerComponentProps> {
	return {
		search: query => dispatch(actions.search(query)),
		downloadAsset: (filename, uuid) => dispatch(actions.downloadAsset.started({ filename, uuid })),
		edit: id => dispatch(actions.openEditor(id)),
		updateElement: (id, changes, newAsset) => dispatch(
			actions.updateElement({
				elementId: id,
				element: changes,
				noteRef,
				newAsset
			})
		)
	};
}

export default connect<INoteViewerComponentProps>(mapStateToProps, mapDispatchToProps)(NoteViewerComponent);
