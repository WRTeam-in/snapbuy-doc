---
title: Changelog
description: Track updates, fixes, and new features released for SnapBuy.
sidebar_position: 100
---

# Changelog

Track all updates, improvements, and fixes released for SnapBuy.

## Version Compatibility Table

| Product Version | Flutter Version | Kotlin Version | AGP Version | distributionUrl (Gradle) | JDK Version |
|---|---|---|---|---|---|
| 1.6.0 | 3.47.8 | 2.3.20 | 9.5.1 | 9.5.11 | 21 |
| 1.5.0 | 3.47.8 | 2.3.20 | 9.5.1 | 9.5.11 | 21 |
| 1.4.0 | 3.47.7 | 2.3.20 | 9.5.1 | 9.5.11 | 21 |
| 1.3.1 | 3.47.4 | 2.3.20 | 9.5.1 | 9.5.11 | 21 |
| 1.3.0 | 3.44.8 | 2.3.20 | 9.5.1 | 9.5.11 | 21 |
| 1.2.0 | 3.44.8 | 2.2.20 | 8.11.1 | 9.5.11 | 21 |
| 1.1.0 | 3.44.8 | 2.2.20 | 8.11.1 | 8.14 | 21 |
| 1.0.0 | 3.44.8 | 2.2.20 | 8.11.1 | 8.14 | 21 |

## Version History

### v1.6.0

- [Added] AI integration with Gemini, OpenAI and OpenAI-compatible providers for content generation, translations and smart suggestions. (Admin)
- [Added] Category Builder for customizing app and website category screens. (Admin, App, Web)
- [Added] Product sliders with filters for categories, brands, attributes, price and discounts. (Admin, App, Web)
- [Added] Customer OTP, Google and Apple login verification. (Admin, App, Web)
- [Added] Automatic refund synchronization with supported payment gateways. (Admin)
- [Added] Export functionality to all tables. (Admin)
- [Added] System Logs settings. (Admin)
- [Added] System Health Check settings. (Admin)
- [Added] Transaction and wallet history filters with pending and failed states. (Admin, App, Web)
- [Improved] Order cancellation, cart stock release and inventory management. (Admin, App, Web)
- [Improved] Security, authentication, payment handling, permissions and overall system stability. (Admin, App, Web)

### v1.5.0

- [Added] Unused images in the Media page. (Admin)
- [Added] Food Item with Add-ons and Add-on Bulk Upload. (Admin, App, Web)
- [Added] App Version Management and Notification feature. (Admin, App)
- [Added] Broken Image field. (Admin)
- [Added] Homebuilder Search Suggestion management. (Admin, App, Web)
- [Added] Buyer Tax Number setting. (Admin, App, Web)
- [Added] Drag-and-drop option for Product Variants reorder. (Admin)
- [Added] Attributes Filter in Homebuilder. (Admin, App, Web)
- [Added] Video support for products. (Admin, App, Web)
- [Improved] SnapBuy is now compatible with PHP 8.5. (Admin)
- [Improved] Product Bulk Update, Category, and Attributes UI. (Admin)
- [Improved] Renamed Store to Branch throughout the system. (Admin, App, Web)
- [Improved] Separated Queue Worker from Cron Job. (Admin)
- [Improved] Page Builder with enhanced app bar and text color customization. (Admin, App)

### v1.4.0

- [Added] Plugin Shiprocket.(Admin, App, Web)
- [Added] Plugin PayU Payment.(Admin, App, Web)
- [Added] Two-factor authentication for admin login, with its own email template. (Admin)
- [Added] Product bulk import: CSV upload with sales-channel and product slab pricing. (Admin)
- [Added] Shipments: a dispatch screen grouping orders by what they are waiting for. (Admin)
- [Added] Manual courier tracking in return request orders. (Admin)
- [Added] Delivery methods per zone: choose delivery boy, courier or manual tracking for each zone. (Admin)
- [Added] Facebook App Event Tracking Integration. (Customer App, Delivery Boy App)
- [Improved] Improvements and fixes. (Admin, App, Web)

### v1.3.1

- [Added] Invoice settings. (Admin)
- [Fix] Improvements and fixes. (Admin, App, Web)

### v1.3.0

- [Added] Spin wheel feature. (Admin, App, Web)
- [Added] Specific page for redirection in homebuilder. (Admin, App, Web)
- [Added] Self pickup from store. (Admin, App, Web)
- [Added] Product tab section for products in Home Builder. (Admin, App, Web)
- [Added] Notify product feature for out-of-stock products. (Admin, App, Web)
- [Improved] Delivery Boy version toggle in settings. (Admin)
- [Fix] UI improvements and minor fixes. (Admin, App, Web)

### v1.2.0

- [Added] Added country-wise Tax System & Tax Rules. (Admin, App, Web)
- [Added] Added Billing & Shipping Address support. (App, Web)
- [Added] Added Estimated Delivery Date for orders. (Admin, App, Web)
- [Added] Added Delivery Order Receipt. (Admin)
- [Added] Added PWA support for the Admin Panel with Dynamic PWA. (Admin, Web)
- [Improved] Improved Home Builder and overall UI. (Admin, App, Web)
- [Improved] Migrated page routes to the App Router to improve performance. (Web)
- [Added] Added QR Code scanning for parcel orders to quickly view complete order details during delivery. (App)
- [Fix] UI improvements and minor fixes. (Admin, App, Web)

### v1.1.0

- [Added] Store Wise Login. (Admin)
- [General] UI improvements and minor fixes. (Admin, App, Web)

### v1.0.0

- Initial release.
