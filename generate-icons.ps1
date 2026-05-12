# Familien-Icon Generator — erstellt alle App-Icons neu
Add-Type -AssemblyName System.Drawing

$iconDir = "C:\Users\admin\Desktop\alleinerziehende Eltern app\icons"
$groessen = @(72, 96, 128, 144, 152, 192, 384, 512)

function New-FamilienIcon {
    param([int]$size)
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Hintergrund: Lila-Pink Gradient (rund, abgerundete Ecken)
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, 0)),
        (New-Object System.Drawing.Point($size, $size)),
        [System.Drawing.Color]::FromArgb(255, 79, 70, 229),
        [System.Drawing.Color]::FromArgb(255, 236, 72, 153)
    )

    # Abgerundetes Rechteck (für maskable: voll-Kreis im Hintergrund)
    $radius = [int]($size * 0.18)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($rect.X, $rect.Y, $radius * 2, $radius * 2, 180, 90)
    $path.AddArc($rect.Right - $radius * 2, $rect.Y, $radius * 2, $radius * 2, 270, 90)
    $path.AddArc($rect.Right - $radius * 2, $rect.Bottom - $radius * 2, $radius * 2, $radius * 2, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $radius * 2, $radius * 2, $radius * 2, 90, 90)
    $path.CloseFigure()
    $g.FillPath($bg, $path)

    # Sonnen-Highlight oben rechts (dezent)
    $sunBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.PointF([float]($size * 0.7), [float]($size * 0.1))),
        (New-Object System.Drawing.PointF([float]($size * 1.0), [float]($size * 0.4))),
        [System.Drawing.Color]::FromArgb(80, 251, 191, 36),
        [System.Drawing.Color]::FromArgb(0, 251, 191, 36)
    )
    $g.FillEllipse($sunBrush, [float]($size * 0.6), [float]($size * 0.05), [float]($size * 0.4), [float]($size * 0.4))

    # Familie: 4 Personen als weiße Silhouetten (Mama, Papa, 2 Kinder)
    $weiss = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $weissTransp = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 255))

    # Größen relativ zur Icon-Größe (safe area: 80% in Mitte)
    $cx = $size / 2
    $cy = $size * 0.55

    # Mama (links, mittelgroß)
    $kopfMama = $size * 0.10
    $mamaX = $cx - $size * 0.18
    $mamaY = $cy - $size * 0.10
    $g.FillEllipse($weiss, [float]($mamaX - $kopfMama / 2), [float]($mamaY - $kopfMama), [float]$kopfMama, [float]$kopfMama)
    # Mama Körper (Kleid - Trapez)
    $mamaKoerper = New-Object System.Drawing.Drawing2D.GraphicsPath
    $mamaKoerper.AddPolygon(@(
        (New-Object System.Drawing.PointF([float]($mamaX - $size * 0.06), [float]$mamaY)),
        (New-Object System.Drawing.PointF([float]($mamaX + $size * 0.06), [float]$mamaY)),
        (New-Object System.Drawing.PointF([float]($mamaX + $size * 0.10), [float]($mamaY + $size * 0.20))),
        (New-Object System.Drawing.PointF([float]($mamaX - $size * 0.10), [float]($mamaY + $size * 0.20)))
    ))
    $g.FillPath($weiss, $mamaKoerper)

    # Papa (rechts, größer)
    $kopfPapa = $size * 0.11
    $papaX = $cx + $size * 0.18
    $papaY = $cy - $size * 0.12
    $g.FillEllipse($weiss, [float]($papaX - $kopfPapa / 2), [float]($papaY - $kopfPapa), [float]$kopfPapa, [float]$kopfPapa)
    # Papa Körper (Rechteck)
    $papaW = $size * 0.16
    $g.FillRectangle($weiss, [float]($papaX - $papaW / 2), [float]$papaY, [float]$papaW, [float]($size * 0.22))

    # Kind 1 (links unten — kleiner)
    $kopfK1 = $size * 0.08
    $k1X = $cx - $size * 0.05
    $k1Y = $cy + $size * 0.05
    $g.FillEllipse($weissTransp, [float]($k1X - $kopfK1 / 2), [float]($k1Y - $kopfK1), [float]$kopfK1, [float]$kopfK1)
    $k1W = $size * 0.10
    $g.FillRectangle($weissTransp, [float]($k1X - $k1W / 2), [float]$k1Y, [float]$k1W, [float]($size * 0.13))

    # Kind 2 (rechts unten — kleinster)
    $kopfK2 = $size * 0.07
    $k2X = $cx + $size * 0.06
    $k2Y = $cy + $size * 0.07
    $g.FillEllipse($weissTransp, [float]($k2X - $kopfK2 / 2), [float]($k2Y - $kopfK2), [float]$kopfK2, [float]$kopfK2)
    $k2W = $size * 0.09
    $g.FillRectangle($weissTransp, [float]($k2X - $k2W / 2), [float]$k2Y, [float]$k2W, [float]($size * 0.11))

    # Herz oberhalb (klein, wie ein Symbol)
    $herzGroesse = $size * 0.07
    $herzX = $cx
    $herzY = $size * 0.20
    $herzPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $herzPath.AddBezier(
        [float]$herzX, [float]($herzY + $herzGroesse * 0.7),
        [float]($herzX - $herzGroesse), [float]($herzY + $herzGroesse * 0.2),
        [float]($herzX - $herzGroesse), [float]($herzY - $herzGroesse * 0.5),
        [float]($herzX - $herzGroesse * 0.3), [float]($herzY - $herzGroesse * 0.5)
    )
    $herzPath.AddBezier(
        [float]($herzX - $herzGroesse * 0.3), [float]($herzY - $herzGroesse * 0.5),
        [float]$herzX, [float]($herzY - $herzGroesse * 0.5),
        [float]$herzX, [float]$herzY,
        [float]$herzX, [float]($herzY + $herzGroesse * 0.4)
    )
    $herzPath.AddBezier(
        [float]$herzX, [float]($herzY + $herzGroesse * 0.4),
        [float]$herzX, [float]$herzY,
        [float]($herzX + $herzGroesse * 0.3), [float]($herzY - $herzGroesse * 0.5),
        [float]($herzX + $herzGroesse * 0.3), [float]($herzY - $herzGroesse * 0.5)
    )
    $herzPath.AddBezier(
        [float]($herzX + $herzGroesse * 0.3), [float]($herzY - $herzGroesse * 0.5),
        [float]($herzX + $herzGroesse), [float]($herzY - $herzGroesse * 0.5),
        [float]($herzX + $herzGroesse), [float]($herzY + $herzGroesse * 0.2),
        [float]$herzX, [float]($herzY + $herzGroesse * 0.7)
    )
    $herzPath.CloseFigure()
    $herzBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 251, 191, 36))
    $g.FillPath($herzBrush, $herzPath)

    return $bmp
}

foreach ($size in $groessen) {
    $bmp = New-FamilienIcon -size $size
    $path = "$iconDir\icon-$size.png"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    "Erstellt: icon-$size.png"
}

"Fertig"
