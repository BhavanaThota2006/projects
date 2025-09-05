import time
from datetime import datetime
import win32gui
import win32process
import psutil
import matplotlib.pyplot as plt

def get_active_window_title():
    window = win32gui.GetForegroundWindow()
    tid, pid = win32process.GetWindowThreadProcessId(window)
    process = psutil.Process(pid)
    name = process.name()
    window_title = win32gui.GetWindowText(window)
    return name, window_title

def is_ignorable_window(app_name, title):
    title_lower = title.strip().lower()
    return (
        app_name.lower() == "chrome.exe"
        and (
            title_lower == ""
            or "new tab" in title_lower
            or title_lower.startswith("chrome://")
        )
    )

def plot_pie_chart(data_dict):
    labels = list(data_dict.keys())
    durations = list(data_dict.values())

    # Filter out very short durations (optional)
    labels, durations = zip(*[
        (label, duration) for label, duration in zip(labels, durations)
        if duration > 2
    ])  # Only show items >2 seconds

    plt.figure(figsize=(7, 7))
    plt.pie(durations, labels=labels, autopct='%1.1f%%', startangle=140)
    plt.title("Time Spent Per Window")
    plt.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
    plt.show()

def main():
    with open("time_log.txt", "w") as f:
        f.write("")

    last_title = None
    start_time = time.time()
    window_time_data = {}

    while True:
        try:
            app_name, title = get_active_window_title()

            if is_ignorable_window(app_name, title):
                time.sleep(1)
                continue

            if title != last_title and title.strip():
                end_time = time.time()
                if last_title is not None:
                    duration = int(end_time - start_time)
                    log = f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | {last_title} | {duration} seconds\n"
                    with open("time_log.txt", "a") as f:
                        f.write(log)
                    print(log.strip())

                    # Add duration to the dictionary
                    window_time_data[last_title] = window_time_data.get(last_title, 0) + duration

                last_title = title
                start_time = time.time()

            time.sleep(1)

        except KeyboardInterrupt:
            print("\nTracking stopped by user.")
            # Log the current window before exiting
            if last_title is not None:
                duration = int(time.time() - start_time)
                window_time_data[last_title] = window_time_data.get(last_title, 0) + duration
                log = f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | {last_title} | {duration} seconds\n"
                with open("time_log.txt", "a") as f:
                    f.write(log)
                print(log.strip())

            # Show pie chart
            print("\nGenerating pie chart...")
            plot_pie_chart(window_time_data)
            break

if __name__ == "__main__":
    main()
