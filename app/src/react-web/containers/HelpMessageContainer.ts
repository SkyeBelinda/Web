import { IStoreState } from '../../core/types';
import {
	default as HelpMessageComponent,
	IHelpMessageComponentLocalProps,
	IHelpMessageComponentProps
} from '../components/HelpMessageComponent';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { actions } from '../../core/actions';
import { ThemeValues } from '../ThemeValues';

export function mapStateToProps({ app }: IStoreState, { message, video }: IHelpMessageComponentLocalProps) {
	return {
		message,
		video,
		show: app.showHelp,
		theme: ThemeValues[app.theme]
	};
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): Partial<IHelpMessageComponentProps> {
	return {
		hide: pref => dispatch(actions.setHelpPref(pref))
	};
}

export default connect<IHelpMessageComponentProps>(mapStateToProps, mapDispatchToProps)(HelpMessageComponent);
