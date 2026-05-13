from django.db import migrations


PLACE_COORDINATES = {
    "kuwait-towers": (29.389681, 48.003014),
    "grand-mosque": (29.378889, 47.974722),
    "failaka-island": (29.433300, 48.333300),
}


def populate_place_coordinates(apps, schema_editor):
    Place = apps.get_model("places", "Place")

    for slug, (latitude, longitude) in PLACE_COORDINATES.items():
        Place.objects.filter(slug=slug).update(
            latitude=latitude,
            longitude=longitude,
        )


def clear_place_coordinates(apps, schema_editor):
    Place = apps.get_model("places", "Place")

    for slug in PLACE_COORDINATES:
        Place.objects.filter(slug=slug).update(
            latitude=None,
            longitude=None,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("places", "0004_favorite"),
    ]

    operations = [
        migrations.RunPython(populate_place_coordinates, clear_place_coordinates),
    ]
