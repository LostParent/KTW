from django.db import migrations, models


def seed_opening_hours(apps, schema_editor):
    Place = apps.get_model("places", "Place")

    default_hours = {
        "kuwait-towers": "8 AM - 11 PM",
        "grand-mosque": "8 AM - 8 PM",
        "failaka-island": "Open all day",
    }

    for slug, opening_hours in default_hours.items():
        Place.objects.filter(slug=slug).update(opening_hours=opening_hours)


class Migration(migrations.Migration):

    dependencies = [
        ("places", "0005_populate_place_coordinates"),
    ]

    operations = [
        migrations.AddField(
            model_name="place",
            name="opening_hours",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.RunPython(seed_opening_hours, migrations.RunPython.noop),
    ]
