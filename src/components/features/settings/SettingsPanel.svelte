<script lang="ts">
	import I18nKey from "@i18n/i18nKey";
	import { i18n } from "@i18n/translation";
	import Icon from "@iconify/svelte";
	import {
		getDefaultHue,
		getDefaultOverlayBlur,
		getDefaultOverlayCardOpacity,
		getDefaultOverlayOpacity,
		getDefaultSakuraEnabled,
		getHue,
		getStoredOverlayBlur,
		getStoredOverlayCardOpacity,
		getStoredOverlayOpacity,
		getStoredSakuraEnabled,
		setHue,
		setOverlayBlur,
		setOverlayCardOpacity,
		setOverlayOpacity,
		setSakuraEnabled,
	} from "@utils/setting-utils";
	import { onMount } from "svelte";
	import {
		fullscreenWallpaperConfig,
		sakuraConfig,
		siteConfig,
	} from "@/config";

	let { className = "" }: { className?: string } = $props();

	const showThemeColor = !siteConfig.themeColor.fixed;

	const overlaySwitchable =
		fullscreenWallpaperConfig.overlay?.switchable ?? false;
	const isOverlayOpacitySwitchable =
		typeof overlaySwitchable === "object"
			? (overlaySwitchable.opacity ?? false)
			: overlaySwitchable;
	const isOverlayBlurSwitchable =
		typeof overlaySwitchable === "object"
			? (overlaySwitchable.blur ?? false)
			: overlaySwitchable;
	const isOverlayCardOpacitySwitchable =
		typeof overlaySwitchable === "object"
			? (overlaySwitchable.cardOpacity ?? false)
			: overlaySwitchable;

	const hasOverlaySettings =
		isOverlayOpacitySwitchable ||
		isOverlayBlurSwitchable ||
		isOverlayCardOpacitySwitchable;

	const isSakuraSwitchable =
		sakuraConfig.enable && (sakuraConfig.switchable ?? false);

	const hasAnyContent = $derived(
		showThemeColor || hasOverlaySettings || isSakuraSwitchable,
	);

	let hue = $state(getHue());
	const defaultHue = getDefaultHue();
	let overlayOpacity = $state(getDefaultOverlayOpacity());
	const defaultOverlayOpacity = getDefaultOverlayOpacity();
	let overlayBlur = $state(getDefaultOverlayBlur());
	const defaultOverlayBlur = getDefaultOverlayBlur();
	let overlayCardOpacity = $state(getDefaultOverlayCardOpacity());
	const defaultOverlayCardOpacity = getDefaultOverlayCardOpacity();
	let sakuraEnabled = $state(getDefaultSakuraEnabled());
	const defaultSakuraEnabled = getDefaultSakuraEnabled();

	let overlaySettingsIsDefault = $derived(
		(!isOverlayOpacitySwitchable || overlayOpacity === defaultOverlayOpacity) &&
			(!isOverlayBlurSwitchable || overlayBlur === defaultOverlayBlur) &&
			(!isOverlayCardOpacitySwitchable ||
				overlayCardOpacity === defaultOverlayCardOpacity),
	);

	function resetHue() {
		hue = defaultHue;
		requestAnimationFrame(refreshAllRangeProgress);
	}

	function resetOverlaySettings() {
		if (
			isOverlayOpacitySwitchable &&
			overlayOpacity !== defaultOverlayOpacity
		) {
			overlayOpacity = defaultOverlayOpacity;
			setOverlayOpacity(defaultOverlayOpacity);
		}
		if (isOverlayBlurSwitchable && overlayBlur !== defaultOverlayBlur) {
			overlayBlur = defaultOverlayBlur;
			setOverlayBlur(defaultOverlayBlur);
		}
		if (
			isOverlayCardOpacitySwitchable &&
			overlayCardOpacity !== defaultOverlayCardOpacity
		) {
			overlayCardOpacity = defaultOverlayCardOpacity;
			setOverlayCardOpacity(defaultOverlayCardOpacity);
		}
		requestAnimationFrame(refreshAllRangeProgress);
	}

	function toggleSakuraEnabled() {
		sakuraEnabled = !sakuraEnabled;
		setSakuraEnabled(sakuraEnabled);
	}

	function updateRangeProgress(input: HTMLInputElement) {
		const min = Number(input.min || 0);
		const max = Number(input.max || 100);
		const value = Number(input.value || 0);
		const progress = ((value - min) * 100) / (max - min || 1);
		input.style.setProperty(
			"--range-progress",
			`${Math.min(100, Math.max(0, progress))}%`,
		);
	}

	function refreshAllRangeProgress() {
		const panel = document.getElementById("display-setting");
		if (!panel) return;
		const rangeInputs = Array.from(
			panel.querySelectorAll('input[type="range"]'),
		) as HTMLInputElement[];
		rangeInputs.forEach(updateRangeProgress);
	}

	onMount(() => {
		overlayOpacity = getStoredOverlayOpacity();
		overlayBlur = getStoredOverlayBlur();
		overlayCardOpacity = getStoredOverlayCardOpacity();
		sakuraEnabled = getStoredSakuraEnabled();

		refreshAllRangeProgress();

		const panel = document.getElementById("display-setting");
		let handleRangeInput: ((event: Event) => void) | undefined;
		if (panel) {
			handleRangeInput = (event: Event) => {
				const target = event.target;
				if (target instanceof HTMLInputElement && target.type === "range") {
					updateRangeProgress(target);
				}
			};
			panel.addEventListener("input", handleRangeInput);
		}

		return () => {
			if (panel && handleRangeInput) {
				panel.removeEventListener("input", handleRangeInput);
			}
		};
	});

	$effect(() => {
		if (hue || hue === 0) {
			setHue(hue);
		}
	});

	$effect(() => {
		if (isOverlayOpacitySwitchable) setOverlayOpacity(overlayOpacity);
		if (isOverlayBlurSwitchable) setOverlayBlur(overlayBlur);
		if (isOverlayCardOpacitySwitchable)
			setOverlayCardOpacity(overlayCardOpacity);
	});
</script>

{#if hasAnyContent}
	<div
		id="display-setting"
		class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-2"
		class:list={[className]}
	>
		{#if showThemeColor}
			<div class="mt-2 mb-2">
				<div class="flex flex-row gap-2 mb-2 items-center justify-between">
					<div
						class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
					before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
					before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
					>
						{i18n(I18nKey.settingsThemeColor)}
						<button
							aria-label="Reset to Default"
							class="btn-regular w-7 h-7 rounded-md active:scale-90"
							class:opacity-0={hue === defaultHue}
							class:pointer-events-none={hue === defaultHue}
							onclick={resetHue}
						>
							<div class="text-(--btn-content)">
								<Icon icon="material-symbols:refresh" class="text-[0.875rem]" />
							</div>
						</button>
					</div>
					<div class="flex gap-1">
						<div
							class="transition bg-(--btn-regular-bg) w-10 h-7 flex justify-center
						font-bold text-sm items-center text-(--btn-content)"
						>
							{hue}
						</div>
					</div>
				</div>
				<div
					class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none"
				>
					<input
						aria-label={i18n(I18nKey.settingsThemeColor)}
						type="range"
						min="0"
						max="360"
						bind:value={hue}
						class="slider"
						id="colorSlider"
						step="5"
						style="width: 100%"
					/>
				</div>
			</div>
		{/if}

		{#if isSakuraSwitchable}
			<div class="mt-2 mb-2">
				<div
					class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
				before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
				before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
				>
					{i18n(I18nKey.effectsSettings)}
				</div>
				<div class="space-y-1">
					<button
						class="w-full btn-regular rounded-md py-2 px-3 flex items-center gap-3 text-left active:scale-95 transition-all relative overflow-hidden"
						class:bg-(--btn-regular-bg-hover)={sakuraEnabled}
						onclick={toggleSakuraEnabled}
					>
						<Icon
							icon="material-symbols:spa-outline-rounded"
							class="text-[1.25rem] shrink-0"
						/>
						<span class="text-sm flex-1">{i18n(I18nKey.sakuraEffect)}</span>
						<div
							class="w-10 h-5 rounded-full transition-all duration-200 relative"
							class:bg-(--primary)={sakuraEnabled}
							class:bg-(--btn-regular-bg-active)={!sakuraEnabled}
						>
							<div
								class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200"
								class:left-0.5={!sakuraEnabled}
								class:left-5={sakuraEnabled}
							></div>
						</div>
					</button>
				</div>
			</div>
		{/if}

		{#if hasOverlaySettings}
			<div class="mt-2 mb-2">
				<div
					class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3 mb-2
				before:w-1 before:h-4 before:rounded-md before:bg-(--primary)
				before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2"
				>
					{i18n(I18nKey.settingsWallpaperEffects)}
					<button
						aria-label="Reset to Default"
						class="btn-regular w-7 h-7 rounded-md active:scale-90"
						class:opacity-0={overlaySettingsIsDefault}
						class:pointer-events-none={overlaySettingsIsDefault}
						onclick={resetOverlaySettings}
					>
						<div class="text-(--btn-content)">
							<Icon icon="material-symbols:refresh" class="text-[0.875rem]" />
						</div>
					</button>
				</div>
				<div class="space-y-2">
					{#if isOverlayOpacitySwitchable}
						<div class="rounded-md bg-(--btn-regular-bg) p-2">
							<div class="flex items-center justify-between mb-1">
								<span
									class="text-sm font-medium text-(--btn-content) opacity-80"
									>{i18n(I18nKey.overlayOpacity)}</span
								>
								<span class="text-xs text-(--btn-content)"
									>{Math.round(overlayOpacity * 100)}%</span
								>
							</div>
							<input
								aria-label={i18n(I18nKey.overlayOpacity)}
								type="range"
								min="20"
								max="100"
								step="1"
								value={Math.round(overlayOpacity * 100)}
								oninput={(e) =>
									(overlayOpacity =
										Number((e.currentTarget as HTMLInputElement).value) / 100)}
								class="slider w-full"
							/>
						</div>
					{/if}
					{#if isOverlayBlurSwitchable}
						<div class="rounded-md bg-(--btn-regular-bg) p-2">
							<div class="flex items-center justify-between mb-1">
								<span
									class="text-sm font-medium text-(--btn-content) opacity-80"
									>{i18n(I18nKey.overlayBlur)}</span
								>
								<span class="text-xs text-(--btn-content)"
									>{overlayBlur.toFixed(1)}px</span
								>
							</div>
							<input
								aria-label={i18n(I18nKey.overlayBlur)}
								type="range"
								min="0"
								max="12"
								step="0.5"
								bind:value={overlayBlur}
								class="slider w-full"
							/>
						</div>
					{/if}
					{#if isOverlayCardOpacitySwitchable}
						<div class="rounded-md bg-(--btn-regular-bg) p-2">
							<div class="flex items-center justify-between mb-1">
								<span
									class="text-sm font-medium text-(--btn-content) opacity-80"
									>{i18n(I18nKey.overlayCardOpacity)}</span
								>
								<span class="text-xs text-(--btn-content)"
									>{Math.round(overlayCardOpacity * 100)}%</span
								>
							</div>
							<input
								aria-label={i18n(I18nKey.overlayCardOpacity)}
								type="range"
								min="20"
								max="100"
								step="1"
								value={Math.round(overlayCardOpacity * 100)}
								oninput={(e) =>
									(overlayCardOpacity =
										Number((e.currentTarget as HTMLInputElement).value) / 100)}
								class="slider w-full"
							/>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	#display-setting input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		height: 1.5rem;
		border-radius: 0.375rem;
		background-image: linear-gradient(
			90deg,
			var(--primary) 0 var(--range-progress, 50%),
			hsla(var(--hue), 22%, 28%, 0.18) var(--range-progress, 50%) 100%
		);
		cursor: pointer;
		transition: background-image 0.15s ease-in-out;
	}

	#display-setting input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 0;
		width: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		box-shadow: none;
	}

	#display-setting input[type="range"]::-moz-range-thumb {
		height: 0;
		width: 0;
		border: 0;
		border-radius: 0;
		background: transparent;
		box-shadow: none;
	}

	#display-setting #colorSlider {
		border-radius: 0;
		background-image: var(--color-selection-bar);
		transition: background-image 0.15s ease-in-out;
	}

	#display-setting #colorSlider::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1rem;
		width: 0.5rem;
		border-radius: 0.125rem;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: none;
	}

	#display-setting #colorSlider::-webkit-slider-thumb:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	#display-setting #colorSlider::-webkit-slider-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}

	#display-setting #colorSlider::-moz-range-thumb {
		height: 1rem;
		width: 0.5rem;
		border-radius: 0.125rem;
		border-width: 0;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: none;
	}

	#display-setting #colorSlider::-moz-range-thumb:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	#display-setting #colorSlider::-moz-range-thumb:active {
		background: rgba(255, 255, 255, 0.6);
	}
</style>
