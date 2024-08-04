import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const Clock = () => {
	const [breakLength, setBreakLength] = useState(5);
	const [sessionLength, setSessionLength] = useState(25);
	const [timeLeft, setTimeLeft] = useState(1500);
	const [isRunning, setIsRunning] = useState(false);
	const [isSession, setIsSession] = useState(true);
	const [intervalId, setIntervalId] = useState(null);
	const audioRef = useRef(null);

	useEffect(() => {
		if (timeLeft === 0) {
			audioRef.current.play();
			if (isSession) {
				setTimeLeft(breakLength * 60);
				setIsSession(false);
			} else {
				setTimeLeft(sessionLength * 60);
				setIsSession(true);
			}
		}
	}, [timeLeft, isSession, breakLength, sessionLength]);

	const handleStartStop = () => {
		if (isRunning) {
			clearInterval(intervalId);
			setIsRunning(false);
		} else {
			const newIntervalId = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);
			setIntervalId(newIntervalId);
			setIsRunning(true);
		}
	};

	const handleReset = () => {
		clearInterval(intervalId);
		setIsRunning(false);
		setBreakLength(5);
		setSessionLength(25);
		setTimeLeft(1500);
		setIsSession(true);
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
	};

	const incrementBreak = () => {
		if (breakLength < 60) setBreakLength(breakLength + 1);
	};

	const decrementBreak = () => {
		if (breakLength > 1) setBreakLength(breakLength - 1);
	};

	const incrementSession = () => {
		if (sessionLength < 60) {
			setSessionLength(sessionLength + 1);
			setTimeLeft((sessionLength + 1) * 60);
		}
	};

	const decrementSession = () => {
		if (sessionLength > 1) {
			setSessionLength(sessionLength - 1);
			setTimeLeft((sessionLength - 1) * 60);
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className="flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-lg">
			<h1 className="text-3xl font-bold mb-6">25 + 5 Clock</h1>
			<div className="flex justify-around w-full mb-6">
				<div className="flex flex-col items-center">
					<h2 id="break-label" className="text-xl">
						Break Length
					</h2>
					<div className="flex items-center">
						<Button id="break-decrement" label="-" onClick={decrementBreak} />
						<span id="break-length" className="text-2xl mx-4">
							{breakLength}
						</span>
						<Button id="break-increment" label="+" onClick={incrementBreak} />
					</div>
				</div>
				<div className="flex flex-col items-center">
					<h2 id="session-label" className="text-xl">
						Session Length
					</h2>
					<div className="flex items-center">
						<Button id="session-decrement" label="-" onClick={decrementSession} />
						<span id="session-length" className="text-2xl mx-4">
							{sessionLength}
						</span>
						<Button id="session-increment" label="+" onClick={incrementSession} />
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center mb-6">
				<h2 id="timer-label" className="text-xl">
					{isSession ? "Session" : "Break"}
				</h2>
				<div id="time-left" className="text-5xl font-mono">
					{formatTime(timeLeft)}
				</div>
			</div>
			<div className="flex">
				<Button id="start_stop" label={isRunning ? "Pause" : "Start"} onClick={handleStartStop} />
				<Button id="reset" label="Reset" onClick={handleReset} />
			</div>
			<audio id="beep" ref={audioRef} src="../beep.mp3" preload="auto"></audio>
		</div>
	);
};

export default Clock;
