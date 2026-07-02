import requests
import heapq
from datetime import datetime, timezone
API_URL = "http://4.224.186.213/evaluation-service/notifications"
weights = {
    "placement": 3,
    "result": 2,
    "event": 1
}
def calculate_score(notification):
    notification_type = notification.get("type", "").lower()
    weight = weights.get(notification_type, 0)
    timestamp = notification.get("timestamp")
    if timestamp:
        notification_time = datetime.fromisoformat(
            timestamp.replace("Z", "+00:00")
        )
        age_minutes = (
            datetime.now(timezone.utc) - notification_time
        ).total_seconds() / 60
    else:
        age_minutes = 0
    score = weight * 1000 - age_minutes
    return score
def get_notifications():
    response = requests.get(API_URL)
    if response.status_code != 200:
        print("Failed to fetch notifications")
        print(response.status_code)
        return []
    return response.json()
def get_top_notifications(notifications):
    heap = []
    for notification in notifications:
        if notification.get("read", False):
            continue
        score = calculate_score(notification)
        item = (score, notification)
        if len(heap) < 10:
            heapq.heappush(heap, item)

        elif score > heap[0][0]:
            heapq.heappop(heap)
            heapq.heappush(heap, item)

    result = sorted(heap, reverse=True)

    return [item[1] for item in result]


def main():
    notifications = get_notifications()
    top_notifications = get_top_notifications(notifications)
    print("\nTop 10 Priority Notifications\n")
    for index, notification in enumerate(top_notifications, start=1):
        print(f"{index}. {notification}")
if __name__ == "__main__":
    main()