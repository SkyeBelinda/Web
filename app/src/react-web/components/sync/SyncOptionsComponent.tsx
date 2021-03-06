import * as React from 'react';
import { ISyncState } from '../../../core/reducers/SyncReducer';
import { SYNC_NAME } from '../../../core/types';
import { ISyncedNotepad, SyncUser } from '../../../core/types/SyncTypes';
import { DifferenceEngine } from '../../DifferenceEngine';
import { Dialog } from '../../dialogs';
import LoginComponent from '../../containers/LoginContainer';
import { FlatNotepad } from 'upad-parse/dist';

export interface ISyncOptionsComponentProps {
	syncState: ISyncState;
	syncId?: string;
	notepad?: FlatNotepad;
	sync?: (syncId: string, notepad: ISyncedNotepad) => void;
	deleteNotepad?: (syncId: string) => void;
	addNotepad?: (user: SyncUser, title: string) => void;
}

export default class SyncOptionsComponent extends React.Component<ISyncOptionsComponentProps> {
	render() {
		const { syncState, syncId, notepad, addNotepad } = this.props;
		if (!notepad || (!syncState.notepadList && syncState.user)) return null;

		if (!syncState.user) {
			return (
				<LoginComponent trigger={
					<strong><a href="#!" style={{
						textDecoration: 'underline',
						whiteSpace: 'normal'
					}}>Connect to {SYNC_NAME} to have this notepad on all of your devices</a></strong>
				} />
			);
		}

		return (
			<React.Fragment>
				<strong>{SYNC_NAME} Options for <em>{notepad.title}</em></strong>
				{!syncId && <span><a href="#!" onClick={() => addNotepad!(syncState.user!, notepad.title)}><br /> Start syncing this notepad</a></span>}

				{
					!!syncId &&
					<div>
						{syncState.isLoading && <span>Syncing...</span>}
						{
							!syncState.isLoading &&
							<div>
								Synced! (<a href="#!" style={{ textDecoration: 'underline' }} onClick={this.manualSync}>Refresh</a>)

								<p>
									<a href="#!"
										style={{
											textDecoration: 'underline',
											textDecorationColor: '#F44336'
										}}
										onClick={() => setTimeout(() => this.stopSyncing(), 0)}>
										Stop syncing this notepad
									</a>
								</p>
							</div>
						}
					</div>
				}
			</React.Fragment>
		);
	}

	private manualSync = async () => {
		const { syncId, notepad, sync } = this.props;
		if (!syncId || !notepad || !sync) return;

		const syncedNotepad = await DifferenceEngine.SyncService.notepadToSyncedNotepad(notepad.toNotepad());
		sync(syncId, syncedNotepad);
	}

	private stopSyncing = async () => {
		const { syncId, notepad, deleteNotepad } = this.props;
		if (!syncId || !notepad || !deleteNotepad) return;

		if (!await Dialog.confirm(`Are you sure you want to remove ${notepad.title} from ${SYNC_NAME}?`)) return;
		deleteNotepad(syncId);
	}
}
