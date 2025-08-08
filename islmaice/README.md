# Islmaice

A minimal dating site with profile browsing and in-dashboard messaging, built with Django.

## Setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver 0.0.0.0:8000
```

Visit `/accounts/signup` to create an account, then browse profiles and message other users.

- Profiles: `/profiles/`
- Inbox: `/messages/`
- Dashboard: `/`