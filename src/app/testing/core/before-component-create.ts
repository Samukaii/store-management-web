let actions: (() => void)[] = [];

export const beforeComponentCreate = (action: () => void) => {
	actions = [
		...actions,
		action
	];
};

export const runBeforeComponentCreateActions = () => {
	actions.forEach(action => {
		action();
	});

	actions = [];
};
