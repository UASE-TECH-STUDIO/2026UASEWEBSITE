# Copies the REAL images and PDFs from your old Django site folder into this project.
# Usage (PowerShell, from the FRONTEND folder):
#   .\scripts\copy-assets.ps1 -Source "C:\path\to\UASE_WEBSITE\core\static\core"
param([Parameter(Mandatory=$true)][string]$Source)
$ErrorActionPreference = "Stop"
$img = Join-Path $Source "images"
$dl  = Join-Path $Source "downloads"
if (-not (Test-Path $img)) { throw "Cannot find $img. Point -Source at the folder that contains 'images' and 'downloads'." }
New-Item -ItemType Directory -Force -Path "public\images","public\downloads" | Out-Null
Copy-Item -Path (Join-Path $img "*") -Destination "public\images" -Recurse -Force
$map = @{
  "uase_graphics_catalog.pdf"                                      = "uase-graphics-catalog.pdf"
}
foreach ($k in $map.Keys) {
  $from = Join-Path $dl $k
  if (Test-Path -LiteralPath $from) { Copy-Item -LiteralPath $from -Destination (Join-Path "public\downloads" $map[$k]) -Force } else { Write-Warning "Missing $from" }
}
$bad = Get-ChildItem "public" -Recurse -File | Where-Object { $_.Length -lt 300 -and $_.Name -ne ".gitkeep" }
if ($bad) { Write-Warning "These files look like Git LFS placeholders, not real files. Run 'git lfs pull' in your old site folder, then run this script again:"; $bad | ForEach-Object { $_.FullName } }
else { Write-Host "Done. All images and PDFs copied." -ForegroundColor Green }
