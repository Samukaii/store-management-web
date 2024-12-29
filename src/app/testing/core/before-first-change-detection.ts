let actions: (() => void)[] = [];

export const beforeFirstChangeDetection = (action: () => void) => {
	actions = [
		...actions,
		action
	];
};

export const runBeforeFirstChangeDetectionActions = () => {
	actions.forEach(action => {
		action();
	});

	actions = [];
};
