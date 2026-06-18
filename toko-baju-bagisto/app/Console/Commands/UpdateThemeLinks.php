<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Webkul\Theme\Models\ThemeCustomization;
use Webkul\Theme\Models\ThemeCustomizationTranslation;

class UpdateThemeLinks extends Command
{
    protected $signature = 'app:update-theme-links';
    protected $description = 'Update hardcoded Shopify hash links on the homepage customizations to actual category URLs';

    public function handle()
    {
        $mappings = [
            '#formal-wear-female'         => '/aksesoris',
            '#formal-wear-men'            => '/hoodie-sweater',
            '#active-wear-female'         => '/celana',
            '#smart-home-automation'      => '/kaos',
            '#mobile-phones-accessories'  => '/aksesoris',
            '#laptops-tablets'            => '/kemeja',
            '#electronics'                => '/kaos',
            '#mens'                       => '/kemeja',
            '#womens'                     => '/celana',
            '#wellness'                   => '/kaos',
            '#active-wear'                => '/kaos',
        ];

        // Process main customizations
        $customizations = ThemeCustomization::all();
        foreach ($customizations as $tc) {
            $options = $tc->options;
            if (empty($options)) {
                continue;
            }

            // Convert to JSON, replace all mapping keys, then decode back
            $optionsJson = json_encode($options);
            $replaced = false;
            foreach ($mappings as $from => $to) {
                if (str_contains($optionsJson, $from)) {
                    $optionsJson = str_replace($from, $to, $optionsJson);
                    $replaced = true;
                }
            }

            if ($replaced) {
                $tc->options = json_decode($optionsJson, true);
                $tc->save();
                $this->info("Updated main options for customization ID: {$tc->id} ({$tc->name})");
            }
        }

        // Process translation records
        $translations = ThemeCustomizationTranslation::all();
        foreach ($translations as $translation) {
            $options = $translation->options;
            if (empty($options)) {
                continue;
            }

            $optionsJson = json_encode($options);
            $replaced = false;
            foreach ($mappings as $from => $to) {
                if (str_contains($optionsJson, $from)) {
                    $optionsJson = str_replace($from, $to, $optionsJson);
                    $replaced = true;
                }
            }

            if ($replaced) {
                $translation->options = json_decode($optionsJson, true);
                $translation->save();
                $this->info("Updated translated options for customization ID: {$translation->theme_customization_id} ({$translation->locale})");
            }
        }

        $this->info("Successfully updated all homepage customization links!");
    }
}
